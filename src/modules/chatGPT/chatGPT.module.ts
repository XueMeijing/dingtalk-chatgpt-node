import { Module } from '@nestjs/common';
import { ChatGPTController } from './chatGPT.controller';
import { ChatGPTService } from './chatGPT.service';
import { importDynamic } from '@/utils/module.util';
import { GPT_SESSION, API_REVERSE_PROXY_URL, GPT_KEY } from '@/app.config';


export const ChatGPTUnofficialProvider = {
  provide: 'ChatGPTUnofficial',
  useFactory: async () => {
    // nest使用cjs，chatgpt是esm，这里使用异步导入
    const { ChatGPTUnofficialProxyAPI } = await importDynamic('chatgpt');
    // 免费但不稳定 - 通过第三方代理调用web端模型，可以在web端历史记录查看
    const bot = new ChatGPTUnofficialProxyAPI({
      apiReverseProxyUrl: API_REVERSE_PROXY_URL,
      accessToken: GPT_SESSION,
      fetch: globalThis.fetch
    });

    return bot
  }
}

export const ChatGPTOfficialProvider = {
  provide: 'ChatGPTOfficial',
  useFactory: async () => {
    // nest使用cjs，chatgpt是esm，这里使用异步导入
    const { ChatGPTAPI } = await importDynamic('chatgpt');
    // 付费稳定稍笨 - 通过官方key调用官方接口，需要非中国节点
    const bot = new ChatGPTAPI({
      apiKey: GPT_KEY,
    });

    return bot
  }
}

@Module({
  imports: [],
  controllers: [ChatGPTController],
  providers: [ChatGPTService, ChatGPTUnofficialProvider, ChatGPTOfficialProvider],
})

export class ChatGPTModule {}