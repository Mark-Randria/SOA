import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class NotificationsListeners {
  constructor(private notificationsService: NotificationsService) {}

  @EventPattern('insurance-created')
  async handleInsuranceCreated(@Payload() data: any, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    console.log(data);

    try {
      await this.notificationsService.create(data);
      channel.ack(msg);
      console.log('Notification sent successfully');
    } catch (err) {
      console.error(
        'Failed to store notification about insurance creation',
        err,
      );
      channel.nack(msg, false, true);
    }
  }

  @EventPattern('insurance-updated')
  async handleInsuranceUpdated(@Payload() data: any, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    console.log(data);

    try {
      await this.notificationsService.create(data);
      channel.ack(msg);
      console.log('Notification about update stored successfully');
    } catch (err) {
      console.error('Failed to store notification about update', err);
      channel.nack(msg, false, true);
    }
  }
}
