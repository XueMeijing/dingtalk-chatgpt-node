import { Injectable, Inject } from '@nestjs/common';
import { replyAnswerTemplateToDingtalk } from '@/utils/reply.util';
import { getAnswerTemplate } from '@/utils/template.util';

@Injectable()
export class ChatGPTService {
  @Inject('ChatGPTUnofficial') chatGPTUnofficialProvider
  @Inject('ChatGPTOfficial') chatGPTOfficialProvider

  async getChatGPTUnofficialResponse(body): Promise<any> {
    const prompt: string = body['text']?.['content']?.trim() ?? ''
    let answer: string = ''

    try {
      let res = await this.chatGPTUnofficialProvider.sendMessage(prompt);
      answer = res.text
      console.log('res', res)
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
      answer = '请求失败，请稍后重试'
    }

    console.log('ChatGPTOfficial text', answer)
    const answerTemplate =  getAnswerTemplate(body, answer)

    replyAnswerTemplateToDingtalk(body, answerTemplate)

    return answerTemplate
  }
}