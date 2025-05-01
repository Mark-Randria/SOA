import { Module } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [InsurancesService],
  exports: [InsurancesService],
})
export class InsurancesModule {}
