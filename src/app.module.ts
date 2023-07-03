import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoutineModule } from './routine/routine.module';

@Module({
  imports: [UserModule, RoutineModule],
})
export class AppModule {}
