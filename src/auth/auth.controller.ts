import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}
  // Creating new user
  @Post('/register')
  register(@Body(ValidationPipe) credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }

  // Login user
  @Post('/login')
  login(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
