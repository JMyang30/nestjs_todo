import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { User } from '@prisma/client';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() data: AuthDTO.SignUp) {
    const { email, nickname } = data;

    const hasEmail = await this.userService.findByNickname({ nickname });

    if (hasEmail) {
      throw new ConflictException('이미 사용중인 닉네임 입니다.');
    }

    const hasNickname = await this.userService.findByEmail({ email });

    if (hasNickname) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    await this.userService.transformPassword(data);

    const userEntity = await this.userService.create(data);

    console.log(userEntity);

    return '회원가입성공';
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.findById({ id });
  }

  @Get()
  async getAllUser(): Promise<User[] | null> {
    return this.userService.findAllUser();
  }
}
