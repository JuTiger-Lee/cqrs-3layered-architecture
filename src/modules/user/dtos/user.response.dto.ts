import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@common/api/response.base';
import { Gender } from '@src/common/db/entitys';

export class UserResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: 'jeffrey',
    description: 'user name',
  })
  name: string;

  @ApiProperty({ example: 'M', description: 'user gender' })
  gender: Gender;
}
