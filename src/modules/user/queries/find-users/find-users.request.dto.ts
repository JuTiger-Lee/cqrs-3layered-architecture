import { ApiProperty } from '@nestjs/swagger';
import { PaginatedQueryRequestDto } from '@src/common/api/paginated-query.request.dto';
import { Type } from 'class-transformer';
import { MaxLength, IsString, IsOptional } from 'class-validator';

export class FindUsersRequestDto extends PaginatedQueryRequestDto {
  @IsOptional()
  @ApiProperty({ example: 'James', description: 'User name', required: false })
  @IsOptional()
  @MaxLength(256)
  @Type(() => String)
  @IsString()
  readonly name?: string;

  @IsOptional()
  @ApiProperty({
    example: 'abcdefg@gmailc.om',
    description: 'User Email',
    required: false,
  })
  @IsOptional()
  @MaxLength(128)
  @Type(() => String)
  @IsString()
  readonly email?: string;

  @IsOptional()
  @ApiProperty({
    example: 'M',
    description: 'User gender, M is Male and F is Femal',
    required: false,
  })
  @MaxLength(1)
  @Type(() => String)
  @IsString()
  readonly gender?: string;
}
