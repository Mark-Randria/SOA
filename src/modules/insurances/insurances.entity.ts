import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IInsurance } from './interfaces/insurances.interface';
@Entity()
export class InsuranceEntity implements IInsurance {
  @PrimaryGeneratedColumn()
  idInsurance: number;

  @Column()
  insuranceDescription: string;
  @Column()
  beneficiary: string;
  @Column()
  insurance_end_date: Date;
  @Column()
  idEmployee: number;
  @Column()
  idHRAdvisor: number;
}
