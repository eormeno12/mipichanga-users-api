import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PayloadToken } from 'src/auth/models/token.model';
import { IAuthRequest } from 'types';
import { AddMatchDto, UpdateUserDto } from '../dtos/users.dtos';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Obtener perfil del usuario' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario obtenido exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  getProfile(@Req() req: IAuthRequest) {
    const userToken = req.user as PayloadToken;
    return this.usersService.findOne(userToken.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  @ApiOperation({ summary: 'Actualizar perfil del usuario' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario actualizado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  updateProfile(@Body() payload: UpdateUserDto, @Req() req: IAuthRequest) {
    const userToken = req.user as PayloadToken;
    return this.usersService.update(userToken.sub, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  @ApiOperation({ summary: 'Eliminar perfil del usuario' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario eliminado exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  deleteProfile(@Req() req: IAuthRequest) {
    const userToken = req.user as PayloadToken;
    return this.usersService.delete(userToken.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me/matches')
  @ApiOperation({ summary: 'Agregar partido al usuario' })
  @ApiBearerAuth()
  @ApiBody({ type: AddMatchDto })
  @ApiResponse({ status: 200, description: 'Partido agregado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  addMatchToUser(@Req() req: IAuthRequest, @Body() payload: AddMatchDto) {
    const user = req.user as PayloadToken;
    return this.usersService.addMatch(user.sub, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/matches/:idMatch')
  @ApiOperation({ summary: 'Eliminar partido del usuario' })
  @ApiBearerAuth()
  @ApiParam({ name: 'idMatch', description: 'ID del partido' })
  @ApiResponse({ status: 200, description: 'Partido eliminado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  deleteMatchFromUser(@Req() req: IAuthRequest) {
    const user = req.user as PayloadToken;
    return this.usersService.deleteMatch(user.sub, req.params.idMatch);
  }
}
