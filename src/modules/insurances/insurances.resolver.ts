import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InsurancesService } from './insurances.service';
import { IInsurance } from './interfaces/insurances.interface';

@Resolver()
export class InsurancesResolver {
  constructor(private insuranceService: InsurancesService) {}

  @Query()
  async allInsurances(): Promise<IInsurance[]> {
    return await this.insuranceService.findAll();
  }

  @Query()
  async findOneInsurance(@Args('idInsurance') id) {
    return await this.insuranceService.findOne(+id);
  }

  @Mutation()
  async createInsurance(
    @Args('insurance') insurance: any,
  ): Promise<IInsurance> {
    return await this.insuranceService.create(insurance);
  }

  @Mutation()
  async updateInsurance(
    @Args('idInsurance') id,
    @Args('insurance') insurance: any,
  ) {
    return await this.insuranceService.update(+id, insurance);
  }

  @Mutation()
  async deleteInsurance(@Args('idInsurance') id) {
    return await this.insuranceService.delete(+id);
  }
}
