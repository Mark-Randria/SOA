import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { NotificationEntity } from './notification.entity';
import { INotification } from './interfaces/notification.interface';
import { CreateNotificationDTO } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  protected dataSource: DataSource;

  private readonly notificationRepository: Repository<NotificationEntity>;
  constructor(@Inject('NOTIFICATION_SERVICE') dataSource: DataSource) {
    this.dataSource = dataSource;
    this.notificationRepository =
      this.dataSource.getRepository(NotificationEntity);
  }

  async findAll(): Promise<INotification[]> {
    return await this.notificationRepository.find();
  }

  async findOne(idNotif: number): Promise<INotification> {
    return await this.notificationRepository.findOne({ where: { idNotif } });
  }

  async findSome(
    idSender: number,
    idReceiver: number,
  ): Promise<INotification[]> {
    return await this.notificationRepository.find({
      where: { idSender, idReceiver },
    });
  }

  async create(
    createNotificationDTO: CreateNotificationDTO,
  ): Promise<INotification> {
    const notification = this.notificationRepository.create(
      createNotificationDTO,
    );

    return await this.notificationRepository.save(notification);
  }
}
