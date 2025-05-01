import { Module } from '@nestjs/common';
import { InsurancesService } from './insurances.service';

@Module({
  providers: [InsurancesService],
})
export class InsurancesModule {}
