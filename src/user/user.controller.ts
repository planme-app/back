import { Controller, Post, Body, ValidationPipe, Res } from '@nestjs/common';
import { UserService } from './service/user.service';
import { signupDto } from './dto/signup.dto';
import { signinDto } from './dto/signin.dto';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) signupDto: signupDto, @Res() res) {
    try {
      const isExistingEmail = await this.userService.checkEmail(
        signupDto.email,
      );
      if (!isExistingEmail) {
        const newUser = this.userService.signup(signupDto);
        res.status(201).json({ user: newUser });
      } else {
        res.status(409).json({ error: 'User with this email already exists' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  @Post('signin')
  async signin(@Body(ValidationPipe) signInDto: signinDto, @Res() res) {
    try {
      const signInUser = await this.userService.signin(signInDto);
      if (signInUser) {
        // const accessToken = this.userService.generateToken(signInUser);
        res.status(200).json({
          // accessToken,
          user: {
            id: signInUser.user_id,
            email: signInUser.email,
            username: signInUser.name,
          },
        });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
