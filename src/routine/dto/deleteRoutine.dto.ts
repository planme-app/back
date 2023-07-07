import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteRoutineParamDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  routineId: string;
}
