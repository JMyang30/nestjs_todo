import { Module } from '@nestjs/common';
import { TodoController } from './controller/todo.controller';
import { TodoService } from './service/todo.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  exports: [],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class TodoModule {}
