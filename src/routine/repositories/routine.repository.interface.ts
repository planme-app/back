import { Prisma, RoutineType, routine } from '@prisma/client';

export interface RoutineRepository {
  routine(
    routineWhereUniqueInput: Prisma.routineWhereUniqueInput,
  ): Promise<routine>;

  routines(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.routineWhereUniqueInput;
    where?: Prisma.routineWhereInput;
    orderBy?: Prisma.routineOrderByWithRelationInput;
  }): Promise<routine[]>;

  getRoutinesByDayIdxAndUserId(
    userId: string,
    dayIdx: number,
  ): Promise<routine[]>;

  createRoutine(
    user_id: string,
    title: string,
    type: RoutineType,
    daysOfWeek: string,
  ): Promise<routine>;
}
