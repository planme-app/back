import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { signupDto } from './dto/signup.dto';
import { signinDto } from './dto/signin.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entities';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userEntity: UserEntity,
  ) {}

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.getUserByEmail(email);
    return user ? true : false;
  }

  async signup(signupDto: signupDto): Promise<User> {
    const hashedPassword = await this.userEntity.encryptPassword(
      signupDto.passwd,
    );
    const createdUser = await this.userRepository.createUser({
      email: signupDto.email,
      name: signupDto.name,
      passwd: hashedPassword,
    });
    return createdUser;
  }

  async signin(signinDto: signinDto): Promise<User> {
    const searchUser = await this.userRepository.getUserByEmail(
      signinDto.email,
    );
    if (!searchUser) {
      return null;
    }

    const isMatchPassword = await this.userEntity.comparePassword(
      signinDto.passwd,
      searchUser.passwd,
    );
    if (!isMatchPassword) {
      return null;
    }

    return searchUser;
  }
}
