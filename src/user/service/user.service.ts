import { Injectable } from '@nestjs/common';
import { signupDto } from '../dto/signup.dto';
import { signinDto } from '../dto/signin.dto';
import { UserRepository } from '../repository/user.repository';
import { UserEntity, SigninEntity } from '../user.entities';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.getUserByEmail(email);
    return !!user;
  }

  async signup(signupDto: signupDto): Promise<UserEntity> {
    const { email, passwd, name } = signupDto;
    const hashedPassword = await this.encryptPassword(passwd);
    const createdUser = await this.userRepository.createUser({
      email: email,
      name: name,
      passwd: hashedPassword,
    });
    return createdUser;
  }

  async signin(signinDto: signinDto): Promise<SigninEntity> {
    const { email, passwd } = signinDto;
    const user = await this.userRepository.getUserByEmail(email);

    if (user && (await this.comparePassword(passwd, user.passwd))) {
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken, user };
    } else {
      return null;
    }
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
}
