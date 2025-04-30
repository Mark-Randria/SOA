import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { DataSource, Repository } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { IEmployee } from './interfaces/employee.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmployeeService extends UsersService {
  private readonly employeeRepository: Repository<EmployeeEntity>;

  constructor(
    @Inject('USER_SERVICE') dataSource: DataSource,
    @Inject('RABBITMQ_USER_SERVICE') rabbitClient: ClientProxy,
  ) {
    super(dataSource, rabbitClient);
    this.employeeRepository = this.dataSource.getRepository(EmployeeEntity);
  }

  async findAllEmployee(): Promise<IEmployee[]> {
    return this.employeeRepository.find();
  }
}
