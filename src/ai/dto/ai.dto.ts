import { IsString } from 'class-validator';

export class AiDTO {
  @IsString()
  readonly question: string;
}
