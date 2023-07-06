import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class EditRoutineDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1) // 최소 하나 이상의 요일이 필요합니다.
  daysOfWeek: string[];

  @IsString()
  @IsNotEmpty()
  goal: string;
}

export class EditRoutineParamDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  routineId: string;
}
