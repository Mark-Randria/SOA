import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsListeners } from './notifications.listeners';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [DatabaseModule, MailerModule],
  controllers: [NotificationsListeners],
  providers: [NotificationsService, NotificationsResolver],
  exports: [NotificationsService],
})
export class NotificationsModule {}
