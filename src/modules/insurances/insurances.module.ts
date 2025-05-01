import { Module } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { DatabaseModule } from 'src/database/database.module';
import { InsurancesResolver } from './insurances.resolver';
import { InsuranceListeners } from './insurances.listeners';

@Module({
  imports: [DatabaseModule],
  controllers: [InsuranceListeners],
  providers: [InsurancesService, InsurancesResolver],
  exports: [InsurancesService, InsurancesResolver],
})
export class InsurancesModule {}
