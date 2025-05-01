import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { IHRAdvisor } from './interfaces/hr-advisor.interface';
import { HRAdvisorService } from './hr-advisor.service';
import { IEmployee } from './interfaces/employee.interface';
import { EmployeeService } from './employee.service';
import { CreateHRAdvisorDTO } from './dto/create-hr-advisor.dto';
import { UpdateHRAdvisorDTO } from './dto/update-hr-advisor.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { CreateEmployeeDTO } from './dto/create-employee.dto';

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private hrService: HRAdvisorService,
    private employeeService: EmployeeService,
  ) {}
  @Query(() => [IUser])
  async allUsers(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Query(() => IUser)
  async findUser(
    @Args('immatriculation') immatriculation: number,
  ): Promise<IUser> {
    return await this.usersService.findOne(+immatriculation);
  }

  @Query()
  async allHRAdvisors(): Promise<IHRAdvisor[]> {
    return this.hrService.findAllHRAdvisors();
  }

  @Query()
  async allEmployees(): Promise<IEmployee[]> {
    return this.employeeService.findAllEmployee();
  }

  @Mutation()
  async testMutation(@Args('message') message: string): Promise<string> {
    return this.usersService.testMutation(message);
  }

  @Mutation()
  async createHRAdvisor(
    @Args('hr') hr: CreateHRAdvisorDTO,
  ): Promise<IHRAdvisor> {
    return this.hrService.createHRAdvisor(hr);
  }

  @Mutation()
  async createEmployee(
    @Args('employee') employee: CreateEmployeeDTO,
  ): Promise<IEmployee> {
    return this.employeeService.createEmployee(employee);
  }

  @Mutation()
  async updateHRAdvisor(
    @Args('immatriculation') immatriculation: number,
    @Args('hr') hr: UpdateHRAdvisorDTO,
  ): Promise<IHRAdvisor> {
    return this.hrService.updateHRAdvisor(+immatriculation, hr);
  }

  @Mutation()
  async updateEmployee(
    @Args('immatriculation') immatriculation: number,
    @Args('employee') employee: UpdateEmployeeDTO,
  ): Promise<IEmployee> {
    return this.employeeService.updateEmployee(+immatriculation, employee);
  }

  @Mutation()
  async deleteUser(
    @Args('immatriculation') immatriculation: number,
  ): Promise<{ success: boolean; message: string }> {
    return this.usersService.deleteUser(+immatriculation);
  }
}
