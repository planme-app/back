import { Prisma, RoutineType, routine } from '@prisma/client';
import { RoutineRepository } from './routine.repository.interface';
import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutineRepositoryImpl implements RoutineRepository {
  constructor(private prisma: PrismaService) {}

  async routine(
    routineWhereUniqueInput: Prisma.routineWhereUniqueInput,
  ): Promise<routine> {
    return this.prisma.routine.findUnique({ where: routineWhereUniqueInput });
  }

  async routines(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.routineWhereUniqueInput;
    where?: Prisma.routineWhereInput;
    orderBy?: Prisma.routineOrderByWithRelationInput;
  }): Promise<routine[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.routine.findMany({ skip, take, cursor, where, orderBy });
  }

  /**
   * dayIdx는 days_of_week_binary 요소의 `인덱스` 입니다.
   * 예를 들어 dayIdx값이 2 일때, `**1****`(화요일) 에 해당하는 routine을 반환합니다.
   * @param {string} userId
   * @param {number} dayIdx
   * @returns dayIdx로 검색한 routine
   */
  async getRoutinesByDayIdxAndUserId(
    userId: string,
    dayIdx: number,
  ): Promise<routine[]> {
    return this.prisma.$queryRaw`
      SELECT *
      FROM routine
      WHERE user_id = ${userId} AND SUBSTRING(days_of_week_binary, ${
      dayIdx + 1
    }, 1) = '1'
  `;
  }

  createRoutine(
    user_id: string,
    title: string,
    type: RoutineType,
    daysOfWeek: string,
  ): Promise<routine> {
    return this.prisma.routine.create({
      data: {
        user_id,
        title,
        type,
        is_repeat: daysOfWeek.length > 0,
        days_of_week_binary: daysOfWeek,
      },
    });
  }
}
