import { RepositoryPort } from '@common/db/repository';
import { UserEntity } from '@src/common/db/entitys';
import { UserIsNotExistException } from '../commands/create-user/errors/create-user.error';
import { Result } from 'oxide.ts';

export interface UserRepository extends RepositoryPort<UserEntity> {
  findOneByEmail(
    email: string,
  ): Promise<Result<UserEntity, UserIsNotExistException>>;
}
