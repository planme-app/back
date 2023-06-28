import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { user as userModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  async signupUser(
    @Body() userData: { email: string; passwd: string; name: string },
  ): Promise<userModel> {
    return this.userService.createUser(userData);
  }
}
