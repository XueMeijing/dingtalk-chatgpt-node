import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { replyAnswerTemplateToDingtalk } from '@/utils/reply.util';
import { getAnswerTemplate } from '@/utils/template.util';
import { ChatGPT } from './chatGPT.entity';

@Injectable()
export class ChatGPTService {
  constructor(
    @InjectRepository(ChatGPT)
    private chatGPTRepository: Repository<ChatGPT>
  ) {}

  @Inject('ChatGPTUnofficial') chatGPTUnofficialProvider
  @Inject('ChatGPTOfficial') chatGPTOfficialProvider

  async getChatGPTUnofficialResponse(body): Promise<any> {
    const prompt: string = body['text']?.['content']?.trim() ?? ''
    const senderId: string = body['senderId']
    const senderName: string = body['senderNick']
    let answer: string = ''

    // 第一次请求把用户id和对话id存数据库
    // 后续同一用户的请求使用存储的对话id
    try {
      let record: ChatGPT = await this.findOne(senderId)

      const { text, conversationId, id } = await this.chatGPTUnofficialProvider.sendMessage(prompt, {
        conversationId: !!record ? record.conversationId : undefined,
        parentMessageId: !!record ? record.parentId : undefined,
      });
      answer = text

      if (record) {
        delete record.updatedAt
        await this.updateOne(senderId, {
          ...record,
          parentId: id
        })
      } else {
        await this.addOne({
          id: senderId,
          name: senderName,
          conversationId,
          parentId: id
        })
      }
    } catch (error) {
      answer = `${JSON.stringify(error)}\n\n请求失败，请稍后重试，或者使用 chatgpt-3.5-turbo 模型（比默认版本稍笨，但比较稳定），使用方式：问题前面增加 /official， 如 /official 什么是筛法`
    }
    console.log('ChatGPTUnofficial text', answer)
    const answerTemplate = getAnswerTemplate(body, answer)

    replyAnswerTemplateToDingtalk(body, answerTemplate)

    return answerTemplate
  }

  async getChatGPTOfficialResponse(body): Promise<any> {
    const prompt = body['text']?.['content']?.trim()
    let answer = ''
    try {
      let res = await this.chatGPTOfficialProvider.sendMessage(prompt);
      answer = res.text
    } catch (error) {
      console.log('error', error)
      answer = `${JSON.stringify(error)}\n\n请求失败，请稍后重试`
    }

    console.log('ChatGPTOfficial text', answer)
    const answerTemplate =  getAnswerTemplate(body, answer)

    replyAnswerTemplateToDingtalk(body, answerTemplate)

    return answerTemplate
  }

  async getResetResponse(body) {
    let record: ChatGPT = await this.findOne(body['senderId'])

    if (record) {
      await this.deleteOne(body['senderId'])
    }
    const answer = '聊天上下文已重置'
    const answerTemplate =  getAnswerTemplate(body, answer)

    replyAnswerTemplateToDingtalk(body, answerTemplate)

    return answerTemplate
  }

  async findOne(id: string): Promise<ChatGPT | null> {
    return await this.chatGPTRepository.findOneBy({ id });
  }

  async addOne(value: Omit<ChatGPT, 'createdAt' | 'updatedAt'>): Promise<ChatGPT | null> {
    return await this.chatGPTRepository.save(value);
  }

  async updateOne(id: string, value: ChatGPT): Promise<void> {
    await this.chatGPTRepository.update(id, value);
  }

  async deleteOne(id: string): Promise<void> {
    await this.chatGPTRepository.delete(id);
  }
}