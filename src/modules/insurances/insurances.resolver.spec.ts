import { Test, TestingModule } from '@nestjs/testing';
import { InsurancesResolver } from './insurances.resolver';

describe('InsurancesResolver', () => {
  let resolver: InsurancesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsurancesResolver],
    }).compile();

    resolver = module.get<InsurancesResolver>(InsurancesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
