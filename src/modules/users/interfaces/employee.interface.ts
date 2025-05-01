import { ObjectType, Field } from '@nestjs/graphql';
import { IUser } from './user.interface';

@ObjectType({ implements: IUser })
export class IEmployee extends IUser {
  @Field()
  jobTitle: string;

  @Field()
  jobDescription: string;

  @Field()
  contractType: string;
}
