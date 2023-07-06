import { user } from '@prisma/client';

export class UserEntity implements user {
  user_id: string;
  email: string;
  passwd: string;
  name: string;
  created_at: Date;
}
