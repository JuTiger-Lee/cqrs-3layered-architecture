import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@src/common/db/entitys';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ example: 'Jeffrey', description: 'user name' })
  @MaxLength(50)
  @MinLength(1)
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '01012345678', description: 'user phone number' })
  @MaxLength(11)
  @MinLength(11)
  @IsString()
  readonly phone: string;

  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'M',
    description: 'user gender',
  })
  @MaxLength(320)
  @MinLength(1)
  @IsString()
  readonly gender: Gender;
}
