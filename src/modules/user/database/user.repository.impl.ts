import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ok, Err, Result } from 'oxide.ts';
import { TypeOrmRepositoryBase } from '@common/db/type-orm-repository.base';
import { UserEntity } from '@common/db/entitys';
import { UserRepository } from './user.repository';
import { UserIsNotExistException } from '../commands/create-user/errors/create-user.error';

@Injectable()
export class UserRepositoryImpl
  extends TypeOrmRepositoryBase<UserEntity>
  implements UserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {
    super(userRepo, new Logger(UserRepositoryImpl.name));
  }

  async findOneByEmail(
    email: string,
  ): Promise<Result<UserEntity, UserIsNotExistException>> {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return Ok(user);
    } else {
      return Err(new UserIsNotExistException());
    }
  }
}
