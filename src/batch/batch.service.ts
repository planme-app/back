// batch.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RoutineType } from '@prisma/client';
import { getDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { RoutineRepositoryImpl } from '../routine/repositories/prisma.routine.repository';
import { RoutineInstanceRepositoryImpl } from '../routine/repositories/prisma.routineInstance.repository';
import { RoutineServiceImpl } from '../routine/services/routine.service';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class BatchService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly routineRepository: RoutineRepositoryImpl,
    private readonly routineInstanceRepository: RoutineInstanceRepositoryImpl,
    private readonly routineService: RoutineServiceImpl,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    try {
      console.log('createTodayRoutineInstances 실행중..');
      this.createTodayRoutineInstances();
    } catch (error) {
      console.error(error);
    }
  }

  private async createTodayRoutineInstances() {
    // 0. 모든 유저가져오기
    const users = await this.userRepository.users({});
    const koreaTime = utcToZonedTime(new Date(), 'Asia/Seoul');
    const koreaDayIdx = getDay(koreaTime);

    for (const user of users) {
      // 1. 한국날짜로 오늘에 해당하는 루틴 목록 가져오기
      console.log(`user: ${user} 배치 실행중`);
      const routines =
        await this.routineRepository.getRoutinesByDayIdxAndUserId(
          user.user_id,
          koreaDayIdx,
        );

      for (const routine of routines) {
        // 2. 해당 루틴의 routine_instance, type_routine_instance 생성하기
        const routineInstance =
          await this.routineInstanceRepository.createRoutineInstance(
            routine.routine_id,
          );
        const goal = await this.getGoal(routine.routine_id, routine.type);

        await this.routineService.createTypeRoutineInstance(
          routine.type,
          routineInstance.routine_instance_id,
          goal,
        );
      }
    }
  }

  private async getGoal(routineId: string, type: RoutineType): Promise<string> {
    const endOfDate = new Date();
    const startOfDate = new Date();
    startOfDate.setDate(startOfDate.getDate() - 10);
    const latestRoutineInstanceWithGoal =
      await this.routineInstanceRepository.findRoutineInstancesWithGoal(
        routineId,
        startOfDate,
        endOfDate,
      );

    let goal;

    if (type === 'bool') {
      goal = latestRoutineInstanceWithGoal.bool_routine_instance[0].goal;
    } else if (type === 'count') {
      goal = latestRoutineInstanceWithGoal.count_routine_instance[0].goal;
    } else if (type === 'time') {
      goal = latestRoutineInstanceWithGoal.time_routine_instance[0].goal;
    }

    return goal.toString();
  }
}
