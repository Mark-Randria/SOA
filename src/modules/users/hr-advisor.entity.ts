import { ChildEntity, Column } from 'typeorm';
import { IHRAdvisor } from './interfaces/hr-advisor.interface';
import { UserEntity } from './user.entity';

@ChildEntity('HRAdvisor')
export class HRAdvisorEntity extends UserEntity implements IHRAdvisor {
  @Column()
  department: string;
}
