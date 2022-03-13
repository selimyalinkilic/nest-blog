import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';

@Injectable()
export class AuthService {
  private mockUser = {
    email: 'test@test.com',
  };

  register(credentials: RegisterDTO) {
    return this.mockUser;
  }

  login(credentials: LoginDTO) {
    if (credentials.email === this.mockUser.email) {
      return this.mockUser;
    }

    throw new InternalServerErrorException();
  }
}
