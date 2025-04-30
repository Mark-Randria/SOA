import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { IHRAdvisor } from './interfaces/hr-advisor.interface';
import { HRAdvisorService } from './hr-advisor.service';
import { IEmployee } from './interfaces/employee.interface';
import { EmployeeService } from './employee.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private hrService: HRAdvisorService,
    private employeeService: EmployeeService,
  ) {}
  @Query()
  async allUsers(): Promise<IUser[]> {
    return this.usersService.findAll();
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
}
