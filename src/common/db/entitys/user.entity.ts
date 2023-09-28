import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

type Femal = 'F';
type Male = 'M';

export type Gender = Male | Femal;

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'name', length: 256 })
  name: string;

  @Column('varchar', { name: 'phone', length: 16 })
  phone: string;

  @Column('varchar', { name: 'email', length: 128 })
  email: string;

  @Column('char', { name: 'gender', length: 1 })
  gender: Gender;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
