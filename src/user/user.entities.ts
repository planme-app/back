import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class UserEntity implements user {
  user_id: string;
  email: string;
  passwd: string;
  name: string;
  created_at: Date;

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordMatch = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    return isPasswordMatch;
  }
}
