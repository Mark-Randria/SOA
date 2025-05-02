// insurance-company.resolver.ts
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InsuranceCompanyService } from './insurance-company.service';
import { InsuranceCompanyEntity } from './insurance-company.entity';

@Resolver()
export class InsuranceCompanyResolver {
  constructor(private companyService: InsuranceCompanyService) {}

  @Query()
  async allInsuranceCompanies(): Promise<InsuranceCompanyEntity[]> {
    return await this.companyService.findAll();
  }

  @Query()
  async findOneInsuranceCompany(@Args('companyID') id: number) {
    return await this.companyService.findOne(+id);
  }

  @Mutation()
  async createInsuranceCompany(
    @Args('company') company: any,
  ): Promise<InsuranceCompanyEntity> {
    return await this.companyService.create(company);
  }

  @Mutation()
  async updateInsuranceCompany(
    @Args('companyID') id: number,
    @Args('company') data: any,
  ): Promise<InsuranceCompanyEntity> {
    return await this.companyService.update(+id, data);
  }

  @Mutation()
  async deleteInsuranceCompany(@Args('companyID') id: number) {
    return await this.companyService.delete(+id);
  }
}
