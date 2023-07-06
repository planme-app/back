import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { PrismaService } from '../prisma.service';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserEntity, PrismaService],
  exports: [UserService],
})
export class UserModule {}
