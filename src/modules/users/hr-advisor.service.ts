import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { DataSource, Repository } from 'typeorm';
import { HRAdvisorEntity } from './hr-advisor.entity';
import { IHRAdvisor } from './interfaces/hr-advisor.interface';
import { ClientProxy } from '@nestjs/microservices';

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
    return this.hrRepository.find();
  }
}
