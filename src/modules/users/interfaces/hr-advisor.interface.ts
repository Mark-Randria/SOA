import { IUser } from './user.interface';

export interface IHRAdvisor extends IUser {
  department: string;
  __typename?: 'HRAdvisor';
}
