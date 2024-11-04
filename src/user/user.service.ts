import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

  async create(userDto: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);
    const user = await this.userRepo.save(userDto);
    delete user.password;
    return user;
  }

  async findOne(loginDto: LoginDTO): Promise<User> {
    const user = this.userRepo.findOneBy({
      email: loginDto.email,
    });

    if (!user) throw new UnauthorizedException('Could not find user');
    return user;
  }
  // 97
}
