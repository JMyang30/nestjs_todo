import { Controller, Get, Put, Post, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
