import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGPTModule } from './modules/chatGPT/chatGPT.module';
import { ChatGPT } from './modules/chatGPT/chatGPT.entity' 

@Module({
  imports: [
    ChatGPTModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'chatgpt.db',
      entities: [ChatGPT],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
