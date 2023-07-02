import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class checkEmailDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    {
      message: 'Please match the email format',
    },
  )
  email: string;
}
