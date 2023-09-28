import { ExceptionBase } from '@src/common/exceptions';
import { USER_IS_NOT_EXIST, USER_SAVE_FAIL } from './create-user.error.code';

export class UserIsNotExistException extends ExceptionBase {
  readonly code = USER_IS_NOT_EXIST;
  static readonly message = 'user is not exist error';

  constructor(message = UserIsNotExistException.message) {
    super(UserIsNotExistException.name, undefined, message, 400);
  }
}

export class UserSaveFailException extends ExceptionBase {
  readonly code = USER_SAVE_FAIL;
  static readonly message = 'user save fail in database';

  constructor(message = UserSaveFailException.message) {
    super(UserSaveFailException.name, undefined, message, 500);
  }
}
