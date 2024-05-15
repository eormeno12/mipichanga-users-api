import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
  MaxDate,
  MinDate,
} from 'class-validator';

export class AddMatchDto {
  @ApiProperty({ description: 'Id of the match' })
  @IsNotEmpty()
  @IsMongoId()
  readonly _id: string;

  @ApiProperty({ description: 'Date when the match was created' })
  @IsNotEmpty()
  @IsDate()
  @MaxDate(new Date())
  readonly createdAt: Date;

  @ApiProperty({ description: 'Name of the match' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Date of the match' })
  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  readonly date: Date;
}

export class CreateUserDto {
  @ApiProperty({ description: 'Email of the user' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password too weak',
  })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
