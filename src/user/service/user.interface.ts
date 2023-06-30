import { signupDto } from '../dto/signup.dto';
import { signinDto } from '../dto/signin.dto';
import { UserEntity } from '../user.entities';

export interface UserInstanceService {
  checkEmail(email: string): Promise<boolean>;
  signup(signupDto: signupDto): Promise<UserEntity>;
  signin(signinDto: signinDto): Promise<UserEntity>;
}
