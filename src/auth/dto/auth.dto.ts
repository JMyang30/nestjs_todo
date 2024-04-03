import { IsEmail, IsString, Length } from 'class-validator';

export namespace AuthDTO {
  export class SignUp {
    @IsEmail()
    readonly email: string;

    @IsString()
    @Length(4, 20)
    readonly password: string;

    @IsString()
    readonly nickname: string;
  }

  export class SignIn {
    @IsEmail()
    readonly email: string;

    @IsString()
    @Length(4, 20)
    readonly password: string;
  }
}
