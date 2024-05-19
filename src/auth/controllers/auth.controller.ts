import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/users/entities/users.entity';
import { IAuthRequest } from 'types';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { StrategyName } from '../models/strategy-name.model';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard(StrategyName.LOCAL))
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ schema: { example: { email: '', password: '' } } })
  @ApiResponse({ status: 201, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  login(@Req() req: IAuthRequest, @Res() res: Response) {
    const user = req.user as User;

    const accessToken = this.authService.generateJWT(user.id);
    res.cookie('access_token', accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Cierre de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
