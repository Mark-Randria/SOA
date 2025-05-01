import { ObjectType, Field } from '@nestjs/graphql';
import { IUser } from './user.interface';

@ObjectType({ implements: IUser })
export class IHRAdvisor extends IUser {
  @Field()
  department: string;
}
