import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { INotification } from './interfaces/notification.interface';
import { CreateNotificationDTO } from './dto/create-notification.dto';

@Resolver('Notification')
export class NotificationsResolver {
  constructor(private notificationService: NotificationsService) {}

  @Query()
  async allNotifications(): Promise<INotification[]> {
    return this.notificationService.findAll();
  }

  @Query()
  async findOneNotification(@Args('id') id): Promise<INotification> {
    return this.notificationService.findOne(+id);
  }

  @Query()
  async findNotifications(
    @Args() args: Partial<INotification>,
  ): Promise<INotification[]> {
    const { idReceiver, idSender } = args;
    return this.notificationService.findSome(+idSender, +idReceiver);
  }

  @Mutation()
  async createNotification(
    @Args('notification') createNotificationDTO: CreateNotificationDTO,
  ): Promise<INotification> {
    return await this.notificationService.create(createNotificationDTO);
  }
}
