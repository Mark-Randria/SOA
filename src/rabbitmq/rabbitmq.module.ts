import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_INSURANCE_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL')],
            queue: config.get<string>('RABBITMQ_MAIN_QUEUE'),
            queueOptions: { durable: false },
          },
        }),
      },
      {
        name: 'RABBITMQ_USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL')],
            queue: config.get<string>('RABBITMQ_MAIN_QUEUE'),
            queueOptions: { durable: false },
          },
        }),
      },
    ]),
  ],
  // ✅ You must re-export the ClientsModule for the tokens to be available
  exports: [ClientsModule],
})
export class RabbitMQModule {}
