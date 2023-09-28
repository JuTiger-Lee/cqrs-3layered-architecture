import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@src/common/api/paginated.response.base';
import { UserResponseDto } from './user.response.dto';

export class UserPaginatedResponseDto extends PaginatedResponseDto<UserResponseDto> {
  @ApiProperty({ type: UserResponseDto, isArray: true })
  readonly data: readonly UserResponseDto[];
}
