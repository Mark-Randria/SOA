import { IUser } from './user.interface';

export interface IEmployee extends IUser {
  jobTitle: string;
  jobDescription: string;
  contractType: string;
}
