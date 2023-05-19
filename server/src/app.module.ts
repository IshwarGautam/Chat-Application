import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
