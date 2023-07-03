import {
  Prisma,
  bool_routine_instance,
  count_routine_instance,
  routine_instance,
  time_routine_instance,
} from '@prisma/client';

export type RoutineInstanceWithIncludes = Prisma.routine_instanceGetPayload<{
  include: {
    count_routine_instance: true;
    time_routine_instance: true;
    bool_routine_instance: true;
  };
}>;
export interface RoutineInstanceRepository {
  routine(
    routineInstanceWhereUniqueInput: Prisma.routine_instanceWhereUniqueInput,
  ): Promise<routine_instance>;

  routines(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.routine_instanceWhereUniqueInput;
    where?: Prisma.routineWhereInput;
    orderBy?: Prisma.routine_instanceOrderByWithRelationInput;
    include?: Prisma.routine_instanceInclude;
  }): Promise<RoutineInstanceWithIncludes[]>;

  findRoutineInstancesWithGoal(
    routine_id: string,
    startOfDay: Date,
    endOfDay: Date,
  ): Promise<RoutineInstanceWithIncludes>;

  createRoutineInstance(routine_id: string): Promise<routine_instance>;

  createTimeRoutineInstance(
    routine_instance_id: string,
    goal: number,
  ): Promise<time_routine_instance>;

  createCountRoutineInstance(
    routine_instance_id: string,
    goal: number,
  ): Promise<count_routine_instance>;

  createBoolRoutineInstance(
    routine_instance_id: string,
    goal: boolean,
  ): Promise<bool_routine_instance>;
}
