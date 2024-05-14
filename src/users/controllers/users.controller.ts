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
  @Put('me/matches')
  @ApiOperation({ summary: 'Add match to user' })
  addMatchToUser(@Req() req: IAuthRequest, @Body() payload: AddMatchDto) {
    const user = req.user as PayloadToken;
    return this.usersService.addMatch(user.sub, payload);
  }

  // delete match from user
  @UseGuards(JwtAuthGuard)
  @Delete('me/matches/:idMatch')
  @ApiOperation({ summary: 'Delete match from user' })
  deleteMatchFromUser(@Req() req: IAuthRequest) {
    const user = req.user as PayloadToken;
    return this.usersService.deleteMatch(user.sub, req.params.idMatch);
  }
}
