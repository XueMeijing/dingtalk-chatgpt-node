import { Controller, Post, Body, UseGuards, Res, Req } from '@nestjs/common';

import { ChatGPTService } from './chatGPT.service';
import { AuthGuard } from '@/common/auth/auth.guard';

@Controller('chatgpt')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}
  
  @UseGuards(AuthGuard)
  @Post('unofficial')
  async getChatGPTUnofficialResponse(@Res() res, @Body() body, @Req() req) {
    const prompt: string = body['text']?.['content']?.trim() ?? ''
    console.log('prompt', prompt)

    // 默认使用web版本，如果出错，可以在问题前面加 /official 使用官方key的版本
    // 钉钉好像禁止了重定向请求，res.redirect(308, '/chatgpt/official') 无效
    if (prompt.indexOf('/official') === 0) {
      const response = await this.chatGPTService.getChatGPTOfficialResponse(body);
      return response
    } else {
      const response = await this.chatGPTService.getChatGPTUnofficialResponse(body);
      return response
    }
  }

  @UseGuards(AuthGuard)
  @Post('official')
  async getChatGPTOfficialResponse(@Body() body) {
    const response = await this.chatGPTService.getChatGPTOfficialResponse(body);
    return response
  }
}
