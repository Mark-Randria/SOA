import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IInsurance } from './interfaces/insurances.interface';
import { InsuranceCompanyEntity } from './insurance-company.entity';
@Entity()
export class InsuranceEntity implements IInsurance {
  @PrimaryGeneratedColumn()
  idInsurance: number;

  @Column()
  insuranceDescription: string;

  @Column()
  beneficiary: string;

  @Column({ type: 'date' })
  insurance_end_date: Date;

  @Column()
  idEmployee: number;

  @Column()
  idHRAdvisor: number;

  @ManyToOne(() => InsuranceCompanyEntity, (company) => company.insurances, {
    eager: true,
    cascade: false,
    nullable: true,
  })
  @JoinColumn({ name: 'companyID' }) // optional, but makes the column name explicit
  company: InsuranceCompanyEntity;
}
