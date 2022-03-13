import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(6)
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;
}

export interface AuthPayload {
  username: string;
}
