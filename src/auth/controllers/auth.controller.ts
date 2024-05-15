import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAuthRequest } from 'types';
import { AuthUser } from '../models/auth-user';
import { StrategyName } from '../models/strategy-name.model';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard(StrategyName.LOCAL))
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  login(@Req() req: IAuthRequest) {
    const user = req.user as AuthUser;
    return this.authService.generateJWT(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
