import { Injectable } from '@nestjs/common';
import { RoutineService } from './routine.interface';
import { RoutineRepositoryImpl } from '../repositories/prisma.routine.repository';
import { RoutineInstanceRepositoryImpl } from '../repositories/prisma.routineInstance.repository';
import { getDay, parseISO, startOfDay, endOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import {
  RoutineType,
  bool_routine_instance,
  count_routine_instance,
  routine,
  time_routine_instance,
} from '@prisma/client';
import { RoutineInstanceWithIncludes } from '../repositories/routinInstance.repository.interface';

@Injectable()
export class RoutineServiceImpl implements RoutineService {
  private readonly day = ['일', '월', '화', '수', '목', '금', '토'];
  constructor(
    private readonly routineRepository: RoutineRepositoryImpl,
    private readonly routineInstanceRepository: RoutineInstanceRepositoryImpl,
  ) {}

  async createRoutine(
    userId: string,
    title: string,
    type: RoutineType,
    daysOfWeek: string[],
    goal: string,
  ) {
    const newRoutine = await this.routineRepository.createRoutine(
      userId,
      title,
      type,
      this.convertDaysOfWeekBinary(daysOfWeek),
    );

    const newRoutineInstance =
      await this.routineInstanceRepository.createRoutineInstance(
        newRoutine.routine_id,
      );

    const newTypeRoutineInstance = await this.createTypeRoutineInstance(
      type,
      newRoutineInstance.routine_instance_id,
      goal,
    );

    return {
      routine_instance_id: newRoutineInstance.routine_instance_id,
      created_at: newRoutineInstance.created_at,
      title: newRoutine.title,
      type: newRoutine.type,
      days_of_week: daysOfWeek,
      goal: newTypeRoutineInstance.goal,
      progress: newTypeRoutineInstance.progress,
    };
  }

  private createTypeRoutineInstance(
    type: RoutineType,
    routine_instance_id: string,
    goal: string,
  ): Promise<
    time_routine_instance | count_routine_instance | bool_routine_instance
  > {
    switch (type) {
      case 'time':
        return this.routineInstanceRepository.createTimeRoutineInstance(
          routine_instance_id,
          Number(goal),
        );

      case 'count':
        return this.routineInstanceRepository.createCountRoutineInstance(
          routine_instance_id,
          Number(goal),
        );

      case 'bool':
        return this.routineInstanceRepository.createBoolRoutineInstance(
          routine_instance_id,
          goal === 'true',
        );
    }
  }

  private convertDaysOfWeekBinary(daysOfWeek: string[]): string {
    return this.day
      .map((day) =>
        daysOfWeek.find((inputDay) => inputDay === day) ? '1' : '0',
      )
      .join('');
  }

  async findRoutinesByDate(userId: string, date: string) {
    try {
      const routines =
        await this.routineRepository.getRoutinesByDayIdxAndUserId(
          userId,
          this.getKorDay(date),
        );
      const promiseRoutineInstances = this.getRoutineInstancesWithGoal(
        routines,
        date,
      );

      return await Promise.all(promiseRoutineInstances);
    } catch (error) {
      console.error(error);
    }
  }

  private getKorDay(dateStr: string) {
    const koreaTime = utcToZonedTime(parseISO(dateStr), 'Asia/Seoul');
    return getDay(koreaTime);
  }

  private getDaysOfWeek(daysOfWeekBinary: string): string[] {
    return daysOfWeekBinary
      .split('')
      .map((binaryDay, idx) => {
        if (binaryDay === '1') {
          return this.day[idx];
        }
        return binaryDay;
      })
      .filter((d) => d !== '0');
  }

  private getGoalandProgress(
    routineType: RoutineType,
    routineInstanceWithGoal: RoutineInstanceWithIncludes,
  ) {
    let goal;
    let progress;

    if (routineType === 'bool') {
      goal = routineInstanceWithGoal.bool_routine_instance[0].goal;
      progress = routineInstanceWithGoal.bool_routine_instance[0].progress;
    } else if (routineType === 'count') {
      goal = routineInstanceWithGoal.count_routine_instance[0].goal;
      progress = routineInstanceWithGoal.count_routine_instance[0].progress;
    } else if (routineType === 'time') {
      goal = routineInstanceWithGoal.time_routine_instance[0].goal;
      progress = routineInstanceWithGoal.time_routine_instance[0].progress;
    }

    return {
      goal,
      progress,
    };
  }

  private getRoutineInstancesWithGoal(routines: routine[], date: string) {
    const start = startOfDay(utcToZonedTime(parseISO(date), 'Asia/Seoul'));
    const end = endOfDay(utcToZonedTime(parseISO(date), 'Asia/Seoul'));

    return routines.map(async (routine) => {
      const routineInstanceWithGoal =
        await this.routineInstanceRepository.findRoutineInstancesWithGoal(
          routine.routine_id,
          start,
          end,
        );

      const { goal, progress } = this.getGoalandProgress(
        routine.type,
        routineInstanceWithGoal,
      );

      return {
        routine_instance_id: routineInstanceWithGoal.routine_instance_id,
        created_at: routineInstanceWithGoal.created_at,
        title: routine.title,
        type: routine.type,
        days_of_week: this.getDaysOfWeek(routine.days_of_week_binary),
        goal,
        progress,
      };
    });
  }
}
