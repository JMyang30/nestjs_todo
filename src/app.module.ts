import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TodoModule,
    UserModule,
    PrismaModule,
    AuthModule,
    AiModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
