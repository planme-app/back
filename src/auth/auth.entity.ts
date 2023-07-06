export class SigninEntity {
  accessToken: string;
  user: SigninUserEntity;
}

export class SigninUserEntity {
  userId: string;
  email: string;
  name: string;
  createdAt: Date;
}

export class SignupEntity {
  userId: string;
  email: string;
  name: string;
  createdAt: Date;
}
