import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { DataSource, Repository } from 'typeorm';
import { HRAdvisorEntity } from './hr-advisor.entity';
import { IHRAdvisor } from './interfaces/hr-advisor.interface';
import { ClientProxy } from '@nestjs/microservices';
import { CreateHRAdvisorDTO } from './dto/create-hr-advisor.dto';
import { UpdateHRAdvisorDTO } from './dto/update-hr-advisor.dto';

@Injectable()
export class HRAdvisorService extends UsersService {
  private readonly hrRepository: Repository<HRAdvisorEntity>;

  constructor(
    @Inject('USER_SERVICE') dataSource: DataSource,
    @Inject('RABBITMQ_USER_SERVICE') rabbitClient: ClientProxy,
  ) {
    super(dataSource, rabbitClient);
    this.hrRepository = this.dataSource.getRepository(HRAdvisorEntity);
  }

  async findAllHRAdvisors(): Promise<IHRAdvisor[]> {
    const hrs = await this.hrRepository.find();
    return hrs.map((hr) => ({
      ...hr,
      __typename: 'HRAdvisor',
    }));
  }

  async createHRAdvisor(hr: CreateHRAdvisorDTO): Promise<IHRAdvisor> {
    const newHR = this.hrRepository.create(hr);
    return await this.hrRepository.save(newHR);
  }
  async updateHRAdvisor(
    id: number,
    hr: UpdateHRAdvisorDTO,
  ): Promise<IHRAdvisor> {
    const hrToUpdate = await this.hrRepository.findOne({
      where: { immatriculation: id },
    });

    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User doesnt exist');
    }

    if (!hrToUpdate) {
      throw new Error('this immatriculation doesnt belong to an HR Advisor');
    }

    await this.hrRepository.update(id, hr);
    return await this.hrRepository.findOne({
      where: { immatriculation: id },
    });
  }
}
