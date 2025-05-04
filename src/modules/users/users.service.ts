import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IDeletedUserResponse, IUser } from './interfaces/user.interface';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InsurancesService } from '../insurances/insurances.service';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly userRepository: Repository<UserEntity>;

  constructor(
    @Inject('USER_SERVICE') protected dataSource: DataSource,
    @Inject('RABBITMQ_USER_SERVICE') private rabbitClient: ClientProxy,
    @Inject(forwardRef(() => InsurancesService))
    private insuranceService: InsurancesService,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async findAll(): Promise<IUser[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<IUser> {
    return await this.userRepository.findOne({
      where: { immatriculation: id },
    });
  }

  async testMutation(message: string): Promise<any> {
    this.rabbitClient.emit('test', message);
    return message;
  }

  async createUser(user: CreateUserDTO): Promise<IUser> {
    try {
      const newUser = this.userRepository.create(user);
      const savedUser = await this.userRepository.save(newUser);

      return savedUser;
    } catch (error) {
      throw error;
    }
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

    const hasInsurance = await this.insuranceService.findByEmployeeId(id);

    if (hasInsurance) {
      try {
        await firstValueFrom(
          this.rabbitClient
            .send({ cmd: 'delete-insurance' }, { employeeId: id })
            .pipe(timeout(5000)),
        );
      } catch (err) {
        console.error('Failed to delete insurance:', err.message);
        throw new Error('Insurance deletion failed. User not deleted.');
      }
    }

    await this.userRepository.delete(id);

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
