import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '@modules/user/commands/create-user/create-user.service';
import { CreateUserCommand } from '@src/modules/user/commands/create-user/create-user.command';
import { Logger } from '@nestjs/common';
import { USER_REPOSITORY } from '@src/modules/user/user.di-tokens';
import { RequestContext } from 'nestjs-request-context';
import { Err, Result, match } from 'oxide.ts';
import { UserSaveFailException } from '@src/modules/user/commands/create-user/errors/create-user.error';
import { IdResponse } from '@src/common/api/id.response.dto';

const mockUserRepository = {
  insert: jest.fn(),
};

describe('Unit - CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
        {
          provide: Logger,
          useValue: {
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = app.get<CreateUserService>(CreateUserService);
  });

  beforeAll(() => {
    new RequestContext({}, {});
  });

  describe('execute', () => {
    it('Get to created user id when is create user success', async () => {
      const commands = new CreateUserCommand({
        name: 'Test user',
        phone: '01012345678',
        email: 'test1@gmail.com',
        gender: 'M',
      });

      // 몇번 호출했는지 알고싶을 때는 spy 사용
      mockUserRepository.insert.mockReturnValue(3);

      const result: Result<IdResponse, UserSaveFailException> =
        await service.execute(commands);

      match(result, {
        Ok: (id) => expect(id).toBeInstanceOf(IdResponse),
      });
    });

    it('Throw `UserSaveFail` exception when is create user failure', async () => {
      const commands = new CreateUserCommand({
        name: 'exception user user',
        phone: '000-000-000',
        email: 'this is not email',
        gender: 'M',
      });

      mockUserRepository.insert.mockReturnValue(
        Err(new UserSaveFailException()),
      );

      const result: Result<IdResponse, UserSaveFailException> =
        await service.execute(commands);

      match(result, {
        Ok: () => {
          // empty because throw exception when is not implement
        },
        Err: (err: Error) => expect(err).toBeInstanceOf(UserSaveFailException),
      });
    });
  });
});
