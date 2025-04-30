import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationsResolver } from './notifications.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [NotificationsService, NotificationsResolver],
  exports: [NotificationsService],
})
export class NotificationsModule {}
