import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { AuthDTO } from '../dto/auth.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { email, password } = authDTO;

    const user = await this.userService.findByEmail({ email });

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);

    if (!isSamePassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    const payload = {
      id: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
