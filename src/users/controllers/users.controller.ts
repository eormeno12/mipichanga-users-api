import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PayloadToken } from 'src/auth/models/token.model';
import { IAuthRequest } from 'types';
import { AddMatchDto, UpdateUserDto } from '../dtos/users.dtos';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // get profile
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Req() req: IAuthRequest) {
    const userToken = req.user as PayloadToken;
    return this.usersService.findOne(userToken.sub);
  }

  // update profile
  @UseGuards(JwtAuthGuard)
  @Put('me')
  @ApiOperation({ summary: 'Update user profile' })
  updateProfile(@Body() payload: UpdateUserDto, @Req() req: IAuthRequest) {
    const userToken = req.user as PayloadToken;
    return this.usersService.update(userToken.sub, payload);
  }

  // delete profile
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  @ApiOperation({ summary: 'Delete user profile' })
  deleteProfile(@Req() req: IAuthRequest) {
    const userToken = req.user as PayloadToken;
    return this.usersService.delete(userToken.sub);
  }

  // add match to user
  @UseGuards(JwtAuthGuard)
  @Put(':userId/matches/:matchId')
  @ApiOperation({ summary: 'Add match to user' })
  addMatchToUser(@Req() req: Request, @Body() payload: AddMatchDto) {
    const { userId, matchId } = req.params;
    return this.usersService.addMatch(userId, matchId, payload);
  }
}
