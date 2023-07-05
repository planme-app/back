import { SignupDto } from '../dto/signup.dto';
import { SigninDto } from '../dto/signin.dto';
import { SigninEntity, SignupEntity } from '../auth.entity';

export interface AuthInstanceService {
  signup(signupDto: SignupDto): Promise<SignupEntity>;
  signin(signinDto: SigninDto): Promise<SigninEntity>;
}
