import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../user.entity';

export interface UserServiceInstance {
  create(createUserDto: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findOne(id: string): Promise<UserEntity>;
  getUserByUserId(user_id: string): Promise<boolean>;
  checkEmail(email: string): Promise<boolean>;
  update(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  remove(id: string): Promise<UserEntity>;
}
