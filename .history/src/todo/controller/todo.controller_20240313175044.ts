import { Controller, Get } from '@nestjs/common';
import { TodoService } from '../service/todo.service';

@Controller('api/v1/todos')
export class TodoController {
    
    constructor(private readonly todoService:TodoService){}
    @Get()
    
}
