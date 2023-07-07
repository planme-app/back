// batch.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchService } from './batch.service';
import { UserModule } from '../user/user.module';
import { RoutineModule } from '../routine/routine.module';

@Module({
  imports: [ScheduleModule.forRoot(), UserModule, RoutineModule],
  providers: [BatchService],
})
export class BatchModule {}
