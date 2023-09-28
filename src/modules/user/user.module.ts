import { Logger, Module, Provider } from '@nestjs/common';
import { UserRepositoryImpl } from './database/user.repository.impl';
import { CreateUserController } from './commands/create-user/create-user.controller';
import { FindUsersHttpController } from './queries/find-users/find-users.controller';
import { CreateUserService } from './commands/create-user/create-user.service';
import { FindUsersQueryHandler } from './queries/find-users/find-users.query-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { USER_REPOSITORY } from './user.di-tokens';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityList } from '@src/common/db/entitys';

const controllers = [CreateUserController, FindUsersHttpController];

const commandHandlers: Provider[] = [CreateUserService];

const queryHandlers: Provider[] = [FindUsersQueryHandler];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(entityList)],
  controllers: [...controllers],
  providers: [Logger, ...repositories, ...commandHandlers, ...queryHandlers],
})
export class UserModule {}
