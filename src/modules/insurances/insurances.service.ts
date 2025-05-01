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
  }
  async findOne(idInsurance: number): Promise<InsuranceEntity> {
    const insurance = await this.insuranceRepository.findOne({
      where: { idInsurance },
    });

    if (!insurance) {
      throw new Error('Insurance doesnt exist');
    }
    if (insurance && insurance.insurance_end_date) {
      insurance.insurance_end_date = new Date(insurance.insurance_end_date);
    }

    return insurance;
  }

  async findByEmployeeId(idEmployee: number): Promise<InsuranceEntity | null> {
    const insurance = await this.insuranceRepository.findOne({
      where: { idEmployee },
    });

    return insurance ?? null;
  }

  async create(insurance: InsuranceEntity): Promise<InsuranceEntity> {
    const existingInsurance = await this.insuranceRepository.findOne({
      where: { idEmployee: insurance.idEmployee },
    });

    if (existingInsurance) {
      throw new Error('This employee already has an insurance.');
    }

    const newInsurance = this.insuranceRepository.create(insurance);
    return await this.insuranceRepository.save(newInsurance);
  }
  async update(idInsurance: number, insurance: InsuranceEntity) {
    const insuranceToUpdate = await this.insuranceRepository.findOne({
      where: { idInsurance },
    });

    if (!insuranceToUpdate) {
      throw new Error('Insurance doesnt exist');
    }

    await this.insuranceRepository.update(idInsurance, insurance);
    return await this.insuranceRepository.findOne({
      where: { idInsurance },
    });
  }

  async delete(idInsurance: number) {
    const insurance = await this.insuranceRepository.findOne({
      where: { idInsurance },
    });

    if (!insurance) {
      return {
        success: false,
        message: 'Insurance not found',
      };
    }

    await this.insuranceRepository.delete(idInsurance);
    return {
      success: true,
      message: 'Insurance deleted successfully',
    };
  }

  async deleteByEmployeeId(idEmployee: number) {
    const insurance = await this.insuranceRepository.findOne({
      where: { idEmployee },
    });

    if (!insurance) {
      return {
        success: false,
        message: 'No insurance tied to this employee',
      };
    }

    await this.insuranceRepository.delete(insurance.idInsurance);
    return {
      success: true,
      message: 'Insurance deleted successfully',
    };
  }
}
