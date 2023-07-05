import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '../dto/signup.dto';
import { SigninDto } from '../dto/signin.dto';
import { SigninEntity, SignupEntity } from '../auth.entity';
import { AuthInstanceService } from './auth.interface';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class AuthService implements AuthInstanceService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<SignupEntity> {
    const { email, passwd, name } = signupDto;

    const isExistingEmail = await this.userRepository.user({ email });
    if (isExistingEmail) {
      throw new UnauthorizedException('signup failed');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwd, saltRounds);
    const user = await this.userRepository.create({
      email,
      name,
      passwd: hashedPassword,
    });

    return {
      userId: user.user_id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
    };
  }

  async signin(signinDto: SigninDto): Promise<SigninEntity> {
    const { email, passwd } = signinDto;
    const user = await this.userRepository.user({ email });

    if (user && (await bcrypt.compare(passwd, user.passwd))) {
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);
      return {
        accessToken,
        user: {
          userId: user.user_id,
          email: user.email,
          name: user.name,
          createdAt: user.created_at,
        },
      };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
