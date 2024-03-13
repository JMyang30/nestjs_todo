import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  },
  postHello(): string {
    return 'Hello World!';
  },
  putHello(): string {
    return 'Hello World!';
  },
  deletHello(): string {
    return 'Hello World!';
  },
}
