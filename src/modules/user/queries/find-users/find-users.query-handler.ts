import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { PaginatedParams, PaginatedQueryBase } from '@src/common/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender, UserEntity } from '@src/common/db/entitys';
import { Repository } from 'typeorm';
import { Paginated } from '@src/common/db/repository';

export class FindUsersQuery extends PaginatedQueryBase {
  readonly name?: string;

  readonly email?: string;

  readonly gender?: string;

  constructor(props: PaginatedParams<FindUsersQuery>) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.gender = props.gender;
  }
}

/**
 * 해당 handler는 비즈니스로직, 퍼시스턴스 로직을 같이 작성해도 무방(단순 조회이므로 불필요한 계층 이동을 방지를 위함)
 * 하지만 비즈니스 로직이 복자해지고 처리할게 많다면 계층 분리해도 됨
 */
@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async execute(
    query: FindUsersQuery,
  ): Promise<Result<Paginated<UserEntity>, Error>> {
    const gender: Gender = query.gender as Gender;

    const result = await this.userRepo.find({
      where: {
        email: query.email ? query.email : undefined,
        name: query.name ? query.name : undefined,
        gender: query.gender ? gender : undefined,
      },
    });

    return Ok(
      new Paginated({
        data: result,
        count: result.length,
        limit: query.limit,
        page: query.page,
      }),
    );
  }
}
