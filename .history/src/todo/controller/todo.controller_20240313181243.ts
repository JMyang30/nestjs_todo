import { Controller, Get } from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { Todo } from '@prisma/client';

@Controller('api/v1/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 전체조회
  @Get()
  async fetchAllTodos(): Promise<Todo[]> {
    return this.todoService.fetchAllTodos();
  }

  // 단일 조회
  @get(':id')
  async fetchTodoItem(): Promise<Todo | null> {
    return this.todoService.fetchTodoItem();
  }
}
