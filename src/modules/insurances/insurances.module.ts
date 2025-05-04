import { forwardRef, Module } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { DatabaseModule } from 'src/database/database.module';
import { InsurancesResolver } from './insurances.resolver';
import { InsuranceListeners } from './insurances.listeners';
import { NotificationsModule } from '../notifications/notifications.module';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { UsersModule } from '../users/users.module';
import { InsuranceCompanyService } from './insurance-company.service';
import { InsuranceCompanyResolver } from './insurance-company.resolver';

@Module({
  imports: [
    DatabaseModule,
    NotificationsModule,
    RabbitMQModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [InsuranceListeners],
  providers: [
    InsurancesService,
    InsurancesResolver,
    InsuranceCompanyService,
    InsuranceCompanyResolver,
  ],
  exports: [InsurancesService, InsuranceCompanyService],
})
export class InsurancesModule {}
