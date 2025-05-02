import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { InsurancesModule } from './modules/insurances/insurances.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { userResolvers } from './modules/users/users.resolver.types';
import { DateScalar } from './scalar/date-scalar';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      resolvers: [userResolvers],
    }),
    UsersModule,
    InsurancesModule,
    NotificationsModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
