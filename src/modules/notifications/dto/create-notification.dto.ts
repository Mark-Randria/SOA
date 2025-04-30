export class CreateNotificationDTO {
  readonly idReceiver: number;
  readonly idSender: number;
  readonly notifTitle: string;
  readonly message: string;
  readonly sendDate: Date;
}
