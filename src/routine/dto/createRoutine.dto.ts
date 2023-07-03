import { RoutineType } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateRoutineDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEnum(RoutineType)
  type: RoutineType;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1) // 최소 하나 이상의 요일이 필요합니다.
  daysOfWeek: string[];

  @IsString()
  @IsNotEmpty()
  goal: string;
}
