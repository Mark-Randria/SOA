import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InsurancesService } from './insurances.service';
import { IInsurance } from './interfaces/insurances.interface';

@Resolver()
export class InsurancesResolver {
  constructor(private insuranceService: InsurancesService) {}

  @Query()
  async allInsurances(): Promise<IInsurance[]> {
    return this.insuranceService.findAll();
  }

  @Query()
  async findOneInsurance(@Args('id') id) {
    return this.insuranceService.findOne(+id);
  }

  @Mutation()
  async createInsurance(
    @Args('insurance') insurance: any,
  ): Promise<IInsurance> {
    return await this.insuranceService.create(insurance);
  }
}
