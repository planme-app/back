import { Injectable } from '@nestjs/common';
import { Prisma, user } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
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

  async create(data: CreateUserDto): Promise<user> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(data: UpdateUserDto): Promise<user> {
    const { userId, email, name, passwd } = data;

    return this.prisma.user.update({
      where: { user_id: userId },
      data: { email, name, passwd },
    });
  }

  async remove(id: string): Promise<user> {
    return this.prisma.user.delete({ where: { user_id: id } });
  }
}
