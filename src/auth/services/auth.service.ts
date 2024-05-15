import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ConfigType } from '@nestjs/config';
import { Response } from 'express';
import config from 'src/config';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from './../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  generateJWT(userId: string) {
    const access_token = this.jwtService.sign({ sub: userId });
    return access_token;
  }

  async validateUser(email: string, password: string): Promise<User> {
    let user = (await this.usersService.findByEmail(email)) as User;

    if (user) {
      const isMatch = await bcrypt.compareSync(password, user.password);
      if (!isMatch) throw new BadRequestException();
    } else {
      user = await this.registerUser(email, password);
    }

    return user;
  }

  async registerUser(email: string, password: string) {
    try {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = await this.usersService.create({
        email,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async logout(res: Response) {
    res.clearCookie('access_token');
    res.status(HttpStatus.OK).send();
  }
}
