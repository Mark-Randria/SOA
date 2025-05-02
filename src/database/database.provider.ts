import { ConfigModule, ConfigService } from '@nestjs/config';
import { InsuranceCompanyEntity } from 'src/modules/insurances/insurance-company.entity';
import { InsuranceEntity } from 'src/modules/insurances/insurances.entity';
import { NotificationEntity } from 'src/modules/notifications/notification.entity';
import { EmployeeEntity } from 'src/modules/users/employee.entity';
import { HRAdvisorEntity } from 'src/modules/users/hr-advisor.entity';
import { UserEntity } from 'src/modules/users/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'USER_SERVICE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST_USER'),
        port: configService.get<number>('DB_PORT_USER'),
        username: configService.get<string>('DB_USERNAME_USER'),
        password: configService.get<string>('DB_PASSWORD_USER'),
        database: configService.get<string>('DB_NAME_USER'),

        // List both Parent and Child entities when STI-ing XD
        entities: [UserEntity, HRAdvisorEntity, EmployeeEntity],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE_USER'),
      });
      return dataSource.initialize();
    },
  },
  {
    provide: 'INSURANCE_SERVICE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST_INSURANCE'),
        port: configService.get<number>('DB_PORT_INSURANCE'),
        username: configService.get<string>('DB_USERNAME_INSURANCE'),
        password: configService.get<string>('DB_PASSWORD_INSURANCE'),
        database: configService.get<string>('DB_NAME_INSURANCE'),
        entities: [InsuranceEntity, InsuranceCompanyEntity],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE_INSURANCE'),
      });
      return dataSource.initialize();
    },
  },
  {
    provide: 'NOTIFICATION_SERVICE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST_NOTIFICATION'),
        port: configService.get<number>('DB_PORT_NOTIFICATION'),
        username: configService.get<string>('DB_USERNAME_NOTIFICATION'),
        password: configService.get<string>('DB_PASSWORD_NOTIFICATION'),
        database: configService.get<string>('DB_NAME_NOTIFICATION'),
        entities: [NotificationEntity],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE_NOTIFICATION'),
      });
      return dataSource.initialize();
    },
  },
];
