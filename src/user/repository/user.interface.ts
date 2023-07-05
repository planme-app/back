import { Prisma, user } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface UserInstanceRepository {
  user(userWhereUniqueInput: Prisma.userWhereUniqueInput): Promise<user | null>;

  users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userWhereUniqueInput;
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithRelationInput;
  }): Promise<user[]>;

  create(data: CreateUserDto): Promise<user>;

  update(data: UpdateUserDto): Promise<user>;

  remove(id: string): Promise<user>;
}
