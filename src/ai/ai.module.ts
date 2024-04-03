import { Module } from '@nestjs/common';
import { AiService } from './service/ai.service';
import { AiController } from './controller/ai.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}
