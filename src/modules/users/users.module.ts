import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersResolver } from './users.resolver';
import { HRAdvisorService } from './hr-advisor.service';
import { EmployeeService } from './employee.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('RABBITMQ_USER_QUEUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  providers: [UsersService, UsersResolver, HRAdvisorService, EmployeeService],
  exports: [UsersService, HRAdvisorService, EmployeeService],
})
export class UsersModule {}
