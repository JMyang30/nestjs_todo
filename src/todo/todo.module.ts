import { Module } from '@nestjs/common';
import { TodoController } from './controller/todo.controller';
import { TodoService } from './service/todo.service';

@Module({
  imports: [],
  exports: [],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
