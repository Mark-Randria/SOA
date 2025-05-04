import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InsuranceCompanyEntity } from './insurance-company.entity';

@Injectable()
export class InsuranceCompanyService {
  private companyRepo: Repository<InsuranceCompanyEntity>;

  constructor(@Inject('INSURANCE_SERVICE') private dataSource: DataSource) {
    this.companyRepo = this.dataSource.getRepository(InsuranceCompanyEntity);
  }

  async findAll(): Promise<InsuranceCompanyEntity[]> {
    return await this.companyRepo.find();
  }

  async findOne(companyID: number): Promise<InsuranceCompanyEntity> {
    const company = await this.companyRepo.findOne({ where: { companyID } });
    if (!company) throw new Error('Company not found');
    return company;
  }

  async create(
    data: Partial<InsuranceCompanyEntity>,
  ): Promise<InsuranceCompanyEntity> {
    const company = this.companyRepo.create(data);
    return await this.companyRepo.save(company);
  }

  async update(
    companyID: number,
    data: Partial<InsuranceCompanyEntity>,
  ): Promise<InsuranceCompanyEntity> {
    await this.companyRepo.update(companyID, data);
    return await this.findOne(companyID);
  }

  async delete(
    companyID: number,
  ): Promise<{ success: boolean; message: string }> {
    const found = await this.companyRepo.findOne({ where: { companyID } });
    if (!found) return { success: false, message: 'Company not found' };

    await this.companyRepo.delete(companyID);
    return { success: true, message: 'Company deleted successfully' };
  }
}
