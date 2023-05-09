import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGPTModule } from './modules/chatGPT/chatGPT.module';

@Module({
  imports: [ChatGPTModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
