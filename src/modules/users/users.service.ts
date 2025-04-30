import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  protected dataSource: DataSource;

  private readonly userRepository: Repository<UserEntity>;
  constructor(@Inject('USER_SERVICE') dataSource: DataSource) {
    this.dataSource = dataSource;
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }
}
