import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IInsuranceCompany } from './interfaces/insurance-company.interface';
import { InsuranceEntity } from './insurances.entity';

@Entity()
export class InsuranceCompanyEntity implements IInsuranceCompany {
  @PrimaryGeneratedColumn()
  companyID: number;

  @Column()
  companyName: string;

  @Column()
  companyAddress: string;

  @Column()
  companyPhone: string;

  @Column({ unique: true })
  companyEmail: string;

  @OneToMany(() => InsuranceEntity, (insurance) => insurance.company)
  insurances: InsuranceEntity[];
}
