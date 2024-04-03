import { NestFactory } from '@nestjs/core';

// import { TodoModule } from './todo/todo.module';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // route 값으로 넘어오는 id 값은 원래 string 이 기본인데 schema 나 entity 의 type 으로 바꿔줌
    }),
  );

  await app.listen(8080);
}
bootstrap();
