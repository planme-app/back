import { Prisma, user } from '@prisma/client';
import { signupDto } from '../dto/signup.dto';

export interface UserInstanceRepository {
  user(userWhereUniqueInput: Prisma.userWhereUniqueInput): Promise<user | null>;
  users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userWhereUniqueInput;
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithRelationInput;
  }): Promise<user[]>;
  getUserByEmail(email: string): Promise<user | null>;
  createUser(data: signupDto): Promise<user>;
}
