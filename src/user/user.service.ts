import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, user, user as userModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { signupDto } from './dto/signup.dto';
import { signinDto } from './dto/signin.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.userWhereUniqueInput,
  ): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userWhereUniqueInput;
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithRelationInput;
  }): Promise<user[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getUserByEmail(email: string): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: Prisma.userCreateInput): Promise<user> {
    return this.prisma.user.create({
      data,
    });
  }

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordMatch = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    return isPasswordMatch;
  }

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    return user ? true : false;
  }

  async signup(signupDto: signupDto): Promise<userModel> {
    try {
      const isExistingUser = await this.checkEmail(signupDto.email);
      if (!isExistingUser) {
        const hashedPassword = await this.encryptPassword(signupDto.passwd);
        return this.createUser({
          email: signupDto.email,
          name: signupDto.name,
          passwd: hashedPassword,
        });
      } else {
        throw new UnauthorizedException('User with this email already exists');
      }
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException(error.response.message);
      } else {
        throw new UnauthorizedException('Invalid email or password');
      }
    }
  }

  async signin(signinDto: signinDto): Promise<userModel> {
    try {
      const searchUser = await this.getUserByEmail(signinDto.email);
      if (!searchUser) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const isMatchPassword = await this.comparePassword(
        signinDto.passwd,
        searchUser.passwd,
      );
      if (!isMatchPassword) {
        throw new UnauthorizedException('Invalid email or password');
      }
      return searchUser;
    } catch (error) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
