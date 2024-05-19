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

export class FieldLocationDto {
  @ApiProperty({ description: 'El prefijo de la ubicación' })
  @IsNotEmpty()
  @IsString()
  readonly prefix: string;

  @ApiProperty({ description: 'La ciudad de la ubicación' })
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'El país de la ubicación' })
  @IsNotEmpty()
  @IsString()
  readonly country: string;
}

export class FieldMatchDto {
  @ApiProperty({ description: 'El ID de la cancha' })
  @IsNotEmpty()
  @IsMongoId()
  readonly _id: string;

  @ApiProperty({ description: 'El nombre de la cancha' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'La URL de la imagen de la cancha' })
  @IsNotEmpty()
  @IsUrl()
  readonly imageUrl: string;

  @ApiProperty({ description: 'La ubicación de la cancha' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FieldLocationDto)
  readonly location: FieldLocationDto;
}

export class AddMatchDto {
  @ApiProperty({ description: 'ID del partido' })
  @IsNotEmpty()
  @IsMongoId()
  readonly _id: string;

  @ApiProperty({ description: 'Fecha de creación del partido' })
  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: 'Nombre del partido' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Fecha del partido' })
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @ApiProperty({ description: 'Cancha del partido' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FieldMatchDto)
  readonly field: FieldMatchDto;
}

export class CreateUserDto {
  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Contraseña demasiado débil',
  })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
