import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  ValidateNested,
} from 'class-validator';
import { FieldLocation, FieldMatch } from '../entities/users.entity';

export class FieldLocationDto implements FieldLocation {
  @ApiProperty({ description: 'The prefix of the location' })
  @IsNotEmpty()
  @IsString()
  readonly prefix: string;

  @ApiProperty({ description: 'The city of the location' })
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'The country of the location' })
  @IsNotEmpty()
  @IsString()
  readonly country: string;
}

export class FieldMatchDto {
  @ApiProperty({ description: 'The id of the field' })
  @IsNotEmpty()
  @IsMongoId()
  readonly _id: string;

  @ApiProperty({ description: 'The name of the field' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The image URL of the field' })
  @IsNotEmpty()
  @IsUrl()
  readonly imageUrl: string;

  @ApiProperty({ description: 'The location of the field' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FieldLocationDto)
  readonly location: FieldLocationDto;
}

export class AddMatchDto {
  @ApiProperty({ description: 'Id of the match' })
  @IsNotEmpty()
  @IsMongoId()
  readonly _id: string;

  @ApiProperty({ description: 'Date when the match was created' })
  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: 'Name of the match' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Date of the match' })
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @ApiProperty({ description: 'Field of the match' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FieldMatchDto)
  readonly field: FieldMatch;
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
