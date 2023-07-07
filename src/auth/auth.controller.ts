import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { CheckEmailDto } from '../auth/dto/checkEmail.dto';
import { AuthService } from './service/auth.service';
import { UserService } from '../user/service/user.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  async signin(@Body(ValidationPipe) signinDto: SigninDto) {
    return await this.authService.signin(signinDto);
  }

  @Get('check-email')
  async checkEmail(@Query(ValidationPipe) checkEmailDto: CheckEmailDto) {
    return await this.userService.checkEmail(checkEmailDto.email);
  }
}
