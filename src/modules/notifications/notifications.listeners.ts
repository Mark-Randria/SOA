import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MailerService } from 'src/mailer/mailer.service';

@Controller()
export class NotificationsListeners {
  constructor(
    private mailerService: MailerService,
    private notificationsService: NotificationsService,
  ) {}

  @EventPattern('insurance-created')
  async handleInsuranceCreated(@Payload() data: any, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    console.log('Insurance Created Event Data:', data);

    try {
      await this.notificationsService.create(data);

      if (data.emailEmployee) {
        await this.mailerService.sendEmail(
          data.emailEmployee,
          data.notifTitle,
          data.message,
        );
        console.log(`Email sent to employee: ${data.emailEmployee}`);
      }

      if (data.companyEmail) {
        await this.mailerService.sendEmail(
          data.companyEmail,
          data.notifTitle,
          `An insurance has been created for your client: ${data.firstname} ${data.lastname}`,
        );
        console.log(`Email sent to company: ${data.companyEmail}`);
      }

      channel.ack(msg);
      console.log('Insurance creation notification processed successfully');
    } catch (err) {
      console.error('Failed to process insurance creation notification:', err);
      channel.nack(msg, false, true);
    }
  }

  @EventPattern('insurance-updated')
  async handleInsuranceUpdated(@Payload() data: any, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    console.log('Insurance Updated Event Data:', data);

    try {
      await this.notificationsService.create(data);

      if (data.emailEmployee) {
        await this.mailerService.sendEmail(
          data.emailEmployee,
          data.notifTitle,
          data.message,
        );
        console.log(`Email sent to employee: ${data.emailEmployee}`);
      }

      if (data.companyEmail) {
        await this.mailerService.sendEmail(
          data.companyEmail,
          data.notifTitle,
          `An insurance update has occurred for your client: ${data.message}`,
        );
        console.log(`Email sent to company: ${data.companyEmail}`);
      }

      channel.ack(msg);
      console.log('Insurance update notification processed successfully');
    } catch (err) {
      console.error('Failed to process insurance update notification:', err);
      channel.nack(msg, false, true);
    }
  }
}
