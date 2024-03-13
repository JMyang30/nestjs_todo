import { Controller, Get, Param } from '@nestjs/common';
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
  @Get(':id')
  async fetchTodoItem(@Param('id'), id: number): Promise<Todo | null> {
    return this.todoService.fetchTodoItem(id);
  }
}
