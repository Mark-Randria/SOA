import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const rabbitmqUrl = configService.get<string>('RABBITMQ_URL');
  const mainQueue = configService.get<string>('RABBITMQ_MAIN_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl],
      queue: mainQueue,
      queueOptions: {
        durable: false,
      },
      noAck: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
