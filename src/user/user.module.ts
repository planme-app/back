import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { PrismaService } from '../prisma.service';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './user.entities';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 60 * 12,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserEntity, PrismaService],
})
export class UserModule {}
