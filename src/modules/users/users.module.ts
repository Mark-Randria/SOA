import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersResolver } from './users.resolver';
import { HRAdvisorService } from './hr-advisor.service';
import { EmployeeService } from './employee.service';
import { InsurancesService } from '../insurances/insurances.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { InsurancesModule } from '../insurances/insurances.module';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
@Module({
  imports: [
    DatabaseModule,
    NotificationsModule,
    InsurancesModule,
    RabbitMQModule,
  ],
  providers: [
    UsersService,
    UsersResolver,
    HRAdvisorService,
    EmployeeService,
    InsurancesService,
  ],
  exports: [UsersService, HRAdvisorService, EmployeeService],
})
export class UsersModule {}
