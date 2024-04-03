import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from '../service/todo.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Todo } from '@prisma/client';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService, PrismaService], // 이 부분을 수정합니다.
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('fetchAllTodos', () => {
    it('should return an array', () => {
      const result = controller.fetchAllTodos();

      expect(result).toBeInstanceOf(Promise<Todo[]>);
    });
  });

  describe('fetchTodoItem', () => {
    it('should return a Todo', async () => {
      const test = {
        title: 'test title',
        content: 'test content',
        is_done: false,
      };

      const item = await controller.createTodoItem(test);

      const result = await controller.fetchTodoItem(item.id);
      expect(result).toBeDefined();
      expect(result).toEqual({ id: item.id, ...test });
    });
  });

  describe('deleteTodoItem', () => {
    it('should delete a Todo', async () => {
      const item = await controller.createTodoItem({
        title: 'test title',
        content: 'test content',
        is_done: false,
      });

      const createdItem = await controller.fetchTodoItem(item.id);

      expect(item).toEqual({ ...createdItem });

      await controller.deleteTodoItem(item.id);

      const deletedItem = await controller.fetchTodoItem(item.id);

      expect(deletedItem).toBeNull();
    });
  });
  describe('updateTodoItem', () => {
    it('should update a Todo', async () => {
      const item = await controller.createTodoItem({
        title: 'test title',
        content: 'test content',
        is_done: false,
      });

      const updateValue = {
        title: 'update title',
        content: 'update content',
        is_done: true,
      };

      const createdItem = await controller.fetchTodoItem(item.id);

      expect(item).toEqual({ ...createdItem });

      const updatedItem = await controller.updateTodoItem(item.id, updateValue);

      expect(updatedItem).toEqual({ id: item.id, ...updateValue });
    });
  });

  describe('createTodoItem', () => {
    it('should create a todo', async () => {
      const createValue = {
        title: 'create title',
        content: 'create content',
        is_done: false,
      };

      const result = await controller.createTodoItem(createValue);

      const createdItem = await controller.fetchTodoItem(result.id);

      expect(result).toEqual(createdItem);
    });
  });
});
