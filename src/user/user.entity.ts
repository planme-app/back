import { user } from '@prisma/client';

export class UserEntity implements user {
  user_id: string;
  email: string;
  passwd: string;
  name: string;
  created_at: Date;
}

export class SigninEntity {
  accessToken: string;
  user: UserEntity;
}
