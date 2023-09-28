import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from 'oxide.ts';
import { routesV1 } from '@config/app.routes';
import { ResponseBase } from '@common/api/response.base';
import { UserEntity } from '@common/db/entitys';
import { Paginated } from '@common/db/repository';
import { UserPaginatedResponseDto } from '@modules/user/dtos/user.paginated.response.dto';
import { FindUsersRequestDto } from './find-users.request.dto';
import { FindUsersQuery } from './find-users.query-handler';

@Controller(routesV1.version)
export class FindUsersHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.user.root)
  @ApiOperation({ summary: 'Find users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserPaginatedResponseDto,
  })
  async findUsers(
    @Query() queryParams: FindUsersRequestDto,
  ): Promise<UserPaginatedResponseDto> {
    const data = {
      email: queryParams?.email,
      name: queryParams?.email,
      gender: queryParams?.gender,
    };

    const query = new FindUsersQuery({
      ...data,
      limit: queryParams?.limit,
      page: queryParams?.page,
    });

    const result: Result<
      Paginated<UserEntity>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    // Whitelisting returned properties
    return new UserPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((user) => ({
        ...new ResponseBase(user),
        email: user.email,
        name: user.name,
        gender: user.gender,
      })),
    });
  }
}
