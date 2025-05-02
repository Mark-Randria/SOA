import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { DataSource, Repository } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { IEmployee } from './interfaces/employee.interface';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  private readonly employeeRepository: Repository<EmployeeEntity>;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject('USER_SERVICE')
    private dataSource: DataSource,
    @Inject('RABBITMQ_USER_SERVICE') private rabbitClient: ClientProxy,
  ) {
    this.employeeRepository = this.dataSource.getRepository(EmployeeEntity);
  }

  async findAllEmployee(): Promise<IEmployee[]> {
    const employees = await this.employeeRepository.find();
    return employees.map((employee) => ({
      ...employee,
      __typename: 'Employee',
    }));
  }

  async createEmployee(employee: CreateEmployeeDTO): Promise<IEmployee> {
    const newEmployee = this.employeeRepository.create(employee);
    return await this.employeeRepository.save(newEmployee);
  }

  async updateEmployee(
    id: number,
    employee: UpdateEmployeeDTO,
  ): Promise<IEmployee> {
    const employeeToUpdate = await this.employeeRepository.findOne({
      where: { immatriculation: id },
    });

    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error('User doesnt exist');
    }

    if (!employeeToUpdate) {
      throw new Error('this immatriculation doesnt belong to an Employee');
    }

    await this.employeeRepository.update(id, employee);
    return await this.employeeRepository.findOne({
      where: { immatriculation: id },
    });
  }
}
