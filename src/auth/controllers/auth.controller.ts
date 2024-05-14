import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAuthRequest } from 'types';
import { AuthUser } from '../models/auth-user';
import { StrategyName } from '../models/strategy-name.model';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard(StrategyName.LOCAL))
  @Post('login')
  login(@Req() req: IAuthRequest) {
    const user = req.user as AuthUser;
    return this.authService.generateJWT(user.id);
  }
}
