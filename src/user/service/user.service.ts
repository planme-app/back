import { Injectable } from '@nestjs/common';
import { signupDto } from '../dto/signup.dto';
import { signinDto } from '../dto/signin.dto';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../user.entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.getUserByEmail(email);
    return !!user;
  }

  async signup(signupDto: signupDto): Promise<UserEntity> {
    const hashedPassword = await this.encryptPassword(signupDto.passwd);
    const createdUser = await this.userRepository.createUser({
      email: signupDto.email,
      name: signupDto.name,
      passwd: hashedPassword,
    });
    return createdUser;
  }

  async signin(signinDto: signinDto): Promise<UserEntity> {
    const searchUser = await this.userRepository.getUserByEmail(
      signinDto.email,
    );
    if (!searchUser) {
      return null;
    }

    const isMatchPassword = await this.comparePassword(
      signinDto.passwd,
      searchUser.passwd,
    );
    if (!isMatchPassword) {
      return null;
    }
    return searchUser;
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
