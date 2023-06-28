import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { user as userModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(
    @Body() user: { email: string; passwd: string; name: string },
  ): Promise<userModel> {
    const isExistingUser = await this.userService.checkEmail(user.email);
    if (!isExistingUser) {
      const hashedPassword = await this.userService.encryptPassword(
        user.passwd,
      );
      return this.userService.createUser({
        email: user.email,
        name: user.name,
        passwd: hashedPassword,
      });
    }
  }

  @Post('signin')
  async signin(
    @Body() user: { email: string; passwd: string },
  ): Promise<userModel> {
    const searchUser = await this.userService.getUserByEmail(user.email);
    if (!searchUser) {
      return null;
    }

    const isMatchPassword = await this.userService.comparePassword(
      user.passwd,
      searchUser.passwd,
    );

    if (!isMatchPassword) {
      return null;
    }

    return searchUser;
  }
}
