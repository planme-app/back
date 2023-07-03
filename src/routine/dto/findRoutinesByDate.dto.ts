import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class UserIdDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class DateStringDTO {
  @IsDateString()
  @IsNotEmpty()
  date: string;
}
