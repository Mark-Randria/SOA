//example of schema first approach

import { IInsuranceCompany } from './insurance-company.interface';

export interface IInsurance {
  idInsurance: number;
  insuranceDescription: string;
  beneficiary: string;
  insurance_end_date: Date;
  idEmployee: number;
  idHRAdvisor: number;
  company: IInsuranceCompany;
}
