import { Module } from '@nestjs/common';
import { RoutineController } from './routine.controller';
import { RoutineServiceImpl } from './services/routine.service';
import { RoutineRepositoryImpl } from './repositories/prisma.routine.repository';
import { RoutineEntity } from './routine.entity';
import { PrismaService } from '../prisma.service';
import { RoutineInstanceRepositoryImpl } from './repositories/prisma.routineInstance.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [RoutineController],
  providers: [
    RoutineServiceImpl,
    RoutineRepositoryImpl,
    RoutineInstanceRepositoryImpl,
    RoutineEntity,
    PrismaService,
  ],
})
export class RoutineModule {}
