import { IUser } from './interfaces/user.interface';

export const userResolvers = {
  User: {
    __resolveType(user: IUser) {
      if ('department' in user) return 'HRAdvisor';
      if ('jobTitle' in user) return 'Employee';
      return null;
    },
  },
};
