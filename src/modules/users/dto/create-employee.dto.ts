import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class CreateEmployeeDTO extends CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly jobTitle: string;

  @IsNotEmpty()
  @IsString()
  readonly jobDescription: string;

  @IsNotEmpty()
  @IsString()
  readonly contractType: string;
}
