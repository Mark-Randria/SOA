// so we're going to implement this using
// Single Table Inheritance (STI) instead of making
// external tables with relationship cuz
// I'm THE ONE WHO DECIDED IT

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Entity()
@TableInheritance({
  column: {
    type: 'varchar',
    name: 'type',
  },
})
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  immatriculation: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  phone: string;

  @Column()
  role: string;
}
