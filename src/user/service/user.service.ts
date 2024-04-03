import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  PASSWORD_SALT = 10;
  constructor(private prismaService: PrismaService) {}

  // 아이디생성
  async create(data: AuthDTO.SignUp): Promise<User | undefined> {
    const password = await this.transformPassword(data);
    const hashed = { ...data, password };
    return await this.prismaService.user.create({ data: hashed });
  }

  async transformPassword(data: AuthDTO.SignUp): Promise<string> {
    return bcrypt.hash(data.password, this.PASSWORD_SALT);
  }

  // 전체유저
  async findAllUser(): Promise<User[] | null> {
    return await this.prismaService.user.findMany();
  }

  // ID로 찾기
  async findById({ id }): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({
      where: { id },
    });
  }

  // 닉네임으로 찾기
  async findByNickname({ nickname }): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({
      where: { nickname },
    });
  }

  // 이메일로 찾기
  async findByEmail({ email }): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }
}
