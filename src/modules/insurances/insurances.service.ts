import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InsuranceEntity } from './insurances.entity';

@Injectable()
export class InsurancesService {
  protected dataSource: DataSource;
  private readonly insuranceRepository: Repository<InsuranceEntity>;
  constructor(@Inject('INSURANCE_SERVICE') dataSource: DataSource) {
    this.dataSource = dataSource;
    this.insuranceRepository = this.dataSource.getRepository(InsuranceEntity);
  }

  async findAll(): Promise<InsuranceEntity[]> {
    return await this.insuranceRepository.find();
    console.log('findAll');
  }
  async findOne(idInsurance: number): Promise<InsuranceEntity> {
    return await this.insuranceRepository.findOne({
      where: { idInsurance },
    });
  }
  async create(insurance: InsuranceEntity): Promise<InsuranceEntity> {
    const newInsurance = this.insuranceRepository.create(insurance);
    return await this.insuranceRepository.save(newInsurance);
  }
  async update(idInsurance: number, insurance: InsuranceEntity) {
    await this.insuranceRepository.update(idInsurance, insurance);
    return await this.insuranceRepository.findOne({
      where: { idInsurance },
    });
  }

  async delete(idInsurance: number) {
    const insurance = await this.insuranceRepository.findOne({
      where: { idInsurance },
    });
    await this.insuranceRepository.delete(idInsurance);
    return insurance;
  }
}
