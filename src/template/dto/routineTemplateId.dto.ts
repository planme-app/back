import { IsNotEmpty, IsString } from 'class-validator';

export class RoutineTemplateIdDto {
  @IsString()
  @IsNotEmpty()
  routineTemplateId: string;
}
