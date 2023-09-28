import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from '@modules/user/database/user.repository';
import { Gender, UserEntity } from '@common/db/entitys';
import { IdResponse } from '@common/api/id.response.dto';
import { CreateUserCommand } from './create-user.command';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserSaveFailException } from './errors/create-user.error';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    @Inject(Logger)
    private readonly logger = new Logger(CreateUserService.name),
  ) {}

  private createUserEntity({
    name,
    phone,
    email,
    gender,
  }: {
    name: string;
    phone: string;
    email: string;
    gender: Gender;
  }) {
    const user = new UserEntity();

    user.name = name;
    user.phone = phone;
    user.email = email;
    user.gender = gender;

    return user;
  }

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<IdResponse, UserSaveFailException>> {
    const userEntity = this.createUserEntity(command);

    try {
      const id = await this.userRepo.insert(userEntity);

      return Ok(new IdResponse(id));
    } catch (err: any) {
      this.logger.error(`User save fail ${err.message}`, err.stack);
      return Err(new UserSaveFailException());
    }
  }
}
