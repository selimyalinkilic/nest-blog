import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decoration';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateDTO } from 'src/models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @UseGuards(AuthGuard())
  async findCurrentUser(@User() { username }: UserEntity) {
    const user = await this.userService.findByUsername(username);
    return { user };
  }

  @Put()
  @UseGuards(AuthGuard())
  async updateUser(
    @User() { username }: UserEntity,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    data: UpdateDTO,
  ) {
    const user = await this.userService.updateUser(username, data);
    return { user };
  }

  @Get('/:username')
  async findSingleUser(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('User not found!');

    return { user };
  }
}
