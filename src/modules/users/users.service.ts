import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUser } from './interfaces/user.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  private readonly userRepository: Repository<UserEntity>;
  constructor(
    @Inject('USER_SERVICE') protected dataSource: DataSource,
    @Inject('RABBITMQ_USER_SERVICE') private rabbitClient: ClientProxy,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  async testMutation(message: string): Promise<any> {
    console.log(message);
    this.rabbitClient.emit('user_queue', message);
    return message;
  }
}
