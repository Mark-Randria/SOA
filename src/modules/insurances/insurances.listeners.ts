// insurance.listeners.ts
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { InsurancesService } from './insurances.service';

@Controller()
export class InsuranceListeners {
  constructor(private insuranceService: InsurancesService) {}

  @MessagePattern({ cmd: 'delete-insurance' })
  async handleUserDeleted(
    @Payload() data: { employeeId: number },
    @Ctx() ctx: RmqContext,
  ) {
    const { employeeId } = data;

    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    try {
      await this.insuranceService.deleteByEmployeeId(employeeId);
      channel.ack(msg);
      console.log('Deleted insurance, sending confirmation');
      return {
        success: true,
      };
    } catch (err) {
      console.log(err);
      channel.nack(msg, false, true);
      throw new Error('Failed to delete insurance');
    }
  }
}
