import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { INotification } from './interfaces/notification.interface';

@Entity()
export class NotificationEntity implements INotification {
  @PrimaryGeneratedColumn()
  idNotif: number;

  @Column()
  idReceiver: number;

  @Column()
  idSender: number;

  @Column()
  notifTitle: string;

  @Column()
  message: string;

  @Column('date')
  sendDate: Date;
}
