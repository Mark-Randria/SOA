export interface INotification {
  idNotif: number;
  idReceiver: number;
  idSender: number;
  notifTitle: string;
  message: string;
  sendDate: Date;
}
