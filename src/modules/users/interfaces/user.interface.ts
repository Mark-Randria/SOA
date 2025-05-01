// user.interface.ts
import { InterfaceType, Field, ID } from '@nestjs/graphql';

@InterfaceType()
export abstract class IUser {
  @Field(() => ID)
  immatriculation: number;

  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  phone: string;

  @Field()
  role: string;
}

export interface IDeletedUserResponse {
  success: boolean;
  message: string;
}
