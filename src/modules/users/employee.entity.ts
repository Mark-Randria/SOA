import { ChildEntity, Column, Unique } from 'typeorm';
import { IEmployee } from './interfaces/employee.interface';
import { UserEntity } from './user.entity';

@ChildEntity('Employee')
@Unique(['idInsurance'])
export class EmployeeEntity extends UserEntity implements IEmployee {
  @Column()
  jobTitle: string;

  @Column()
  jobDescription: string;

  @Column()
  contractType: string;

  @Column({ nullable: true })
  idInsurance: number;
}
