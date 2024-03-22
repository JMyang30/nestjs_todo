import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly is_done?: boolean;
}

// PartialType 은 모든 필드를 optional로 변경한 클래스를 반환
export class UpdateTodoDto extends PartialType(TodoDto) {}
