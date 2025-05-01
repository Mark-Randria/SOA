import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IDeletedUserResponse, IUser } from './interfaces/user.interface';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

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

  async createUser(user: CreateUserDTO): Promise<IUser> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, user: UpdateUserDTO): Promise<IUser> {
    const userToUpdate = await this.userRepository.findOne({
      where: { immatriculation: id },
    });

    if (!userToUpdate) {
      throw new Error('User not found');
    }

    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({
      where: { immatriculation: id },
    });
  }

  async deleteUser(id: number): Promise<IDeletedUserResponse> {
    const userToDelete = await this.userRepository.findOne({
      where: { immatriculation: id },
    });

    if (!userToDelete) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    await this.userRepository.delete(id);

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
