import { Command, CommandProps } from '@common/cqrs';
import { Gender } from '@src/common/db/entitys';

export class CreateUserCommand extends Command {
  readonly name: string;

  readonly phone: string;

  readonly email: string;

  readonly gender: Gender;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.name = props.name;
    this.phone = props.phone;
    this.email = props.email;
    this.gender = props.gender;
  }
}
