import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class CreateHRAdvisorDTO extends CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly department: string;
}
