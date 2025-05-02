import { forwardRef, Module } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { DatabaseModule } from 'src/database/database.module';
import { InsurancesResolver } from './insurances.resolver';
import { InsuranceListeners } from './insurances.listeners';
import { NotificationsModule } from '../notifications/notifications.module';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    DatabaseModule,
    NotificationsModule,
    RabbitMQModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [InsuranceListeners],
  providers: [InsurancesService, InsurancesResolver],
  exports: [InsurancesService, InsurancesResolver],
})
export class InsurancesModule {}
