import { Prisma, routine } from '@prisma/client';

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
}
