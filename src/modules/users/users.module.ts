import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersResolver } from './users.resolver';
import { HRAdvisorService } from './hr-advisor.service';
import { EmployeeService } from './employee.service';
@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UsersResolver, HRAdvisorService, EmployeeService],
  exports: [UsersService, HRAdvisorService, EmployeeService],
})
export class UsersModule {}
