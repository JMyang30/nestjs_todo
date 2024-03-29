import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { Todo } from '@prisma/client';
import { TodoDto, UpdateTodoDto } from '../dto/todo.dto';
@Controller('api/v1/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async fetchAllTodos(): Promise<Todo[]> {
    return this.todoService.fetchAllTodos();
  }

  @Get(':id')
  async fetchTodoItem(@Param('id') id: number): Promise<Todo | null> {
    console.log(typeof id);
    return this.todoService.fetchTodoItem(id);
  }

  @Delete(':id')
  async deleteTodoItem(@Param('id') id: number): Promise<Todo | null> {
    return this.todoService.deleteTodoItem(id);
  }

  @Put(':id')
  async updateTodoItem(
    @Param('id') id: number,
    @Body() data: UpdateTodoDto,
  ): Promise<Todo | null> {
    return this.todoService.updateTodoItem(
      id,
      data.title,
      data.content,
      data.is_done,
    );
  }

  @Post()
  async createTodoItem(@Body() data: TodoDto): Promise<Todo> {
    return this.todoService.addTodoItem(data);
  }
}
