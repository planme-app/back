import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { user as userModel } from '@prisma/client';
import { signupDto } from './dto/signup.dto';
import { signinDto } from './dto/signin.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) signUpDto: signupDto): Promise<userModel> {
    return this.userService.signup(signUpDto);
  }

  @Post('signin')
  async signin(@Body(ValidationPipe) signInDto: signinDto): Promise<userModel> {
    return this.userService.signin(signInDto);
  }
}
