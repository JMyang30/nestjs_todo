import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Todo } from '@prisma/client';
import { TodoDto } from '../dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  // 전체 조회
  async fetchAllTodos(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  // 단일 조회
  async fetchTodoItem(id: number): Promise<Todo | null> {
    return this.prismaService.todo.findUnique({
      where: { id },
    });
  }

  // 단일 삭제
  async deleteTodoItem(id: number): Promise<Todo | null> {
    return this.prismaService.todo.delete({
      where: {
        id,
      },
    });
  }

  // 단일 수정
  async updateTodoItem(
    id: number,
    title: string,
    content: string,
    is_done: boolean,
  ): Promise<Todo | null> {
    return this.prismaService.todo.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        is_done,
      },
    });
  }

  // 단일 추가
  async addTodoItem(data: TodoDto): Promise<Todo | null> {
    return this.prismaService.todo.create({ data: data });
  }
}
