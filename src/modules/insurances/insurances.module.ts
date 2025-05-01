import { Module } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { DatabaseModule } from 'src/database/database.module';
import { InsurancesResolver } from './insurances.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [InsurancesService, InsurancesResolver],
  exports: [InsurancesService],
})
export class InsurancesModule {}
