import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthService, JwtService, UserService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
