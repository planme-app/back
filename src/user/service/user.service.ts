import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { UserServiceInstance } from './user.interface';

@Injectable()
export class UserService implements UserServiceInstance {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, passwd, name } = createUserDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwd, saltRounds);
    const user = await this.userRepository.create({
      email,
      name,
      passwd: hashedPassword,
    });
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.users({});
    return users;
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.user({ user_id: id });
    return user;
  }

  async getUserByUserId(user_id: string): Promise<boolean> {
    const user = await this.userRepository.user({ user_id });
    return !!user;
  }

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.user({ email });
    return !!user;
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { userId } = updateUserDto;

    const user = await this.userRepository.user({ user_id: userId });

    if (!user) {
      throw new NotFoundException(`Can't find user with id ${userId}`);
    }

    const newUser = await this.userRepository.update(updateUserDto);

    return newUser;
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.userRepository.user({ user_id: id });

    if (!user) {
      throw new NotFoundException(`Can't find user with id ${id}`);
    }

    return await this.userRepository.remove(id);
  }
}
