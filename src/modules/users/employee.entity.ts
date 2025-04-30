import { ChildEntity, Column } from 'typeorm';
import { IEmployee } from './interfaces/employee.interface';
import { UserEntity } from './user.entity';

@ChildEntity('Employee')
export class EmployeeEntity extends UserEntity implements IEmployee {
  @Column()
  jobTitle: string;

  @Column()
  jobDescription: string;

  @Column()
  contractType: string;
}
