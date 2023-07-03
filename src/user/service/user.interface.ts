import { signupDto } from '../dto/signup.dto';
import { signinDto } from '../dto/signin.dto';
import { SigninEntity, UserEntity } from '../user.entity';

export interface UserInstanceService {
  checkEmail(email: string): Promise<boolean>;
  signup(signupDto: signupDto): Promise<UserEntity>;
  signin(signinDto: signinDto): Promise<SigninEntity>;
}
