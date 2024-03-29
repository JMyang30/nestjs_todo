import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  // 전체 조회
  async fetchAllTodos(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }
}
