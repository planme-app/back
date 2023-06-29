import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entities';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserEntity, PrismaService],
})
export class UserModule {}
