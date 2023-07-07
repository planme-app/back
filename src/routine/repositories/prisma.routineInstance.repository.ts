import {
  Prisma,
  bool_routine_instance,
  count_routine_instance,
  routine_instance,
  time_routine_instance,
} from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import {
  RoutineInstanceRepository,
  RoutineInstanceWithIncludes,
} from './routinInstance.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutineInstanceRepositoryImpl
  implements RoutineInstanceRepository
{
  constructor(private prisma: PrismaService) {}

  routine(
    routineInstanceWhereUniqueInput: Prisma.routine_instanceWhereUniqueInput,
  ): Promise<routine_instance> {
    return this.prisma.routine_instance.findUnique({
      where: routineInstanceWhereUniqueInput,
    });
  }

  routines(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.routine_instanceWhereUniqueInput;
    where?: Prisma.routineWhereInput;
    orderBy?: Prisma.routine_instanceOrderByWithRelationInput;
    include?: Prisma.routine_instanceInclude;
  }): Promise<RoutineInstanceWithIncludes[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.routine_instance.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    }) as Promise<RoutineInstanceWithIncludes[]>;
  }

  findRoutineInstancesWithGoal(
    routine_id: string,
    startOfDay: Date,
    endOfDay: Date,
  ): Promise<RoutineInstanceWithIncludes> {
    return this.routines({
      where: {
        AND: {
          routine_id: routine_id,
          created_at: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      },
      include: {
        count_routine_instance: true,
        time_routine_instance: true,
        bool_routine_instance: true,
      },
    }).then((routine) => routine[0]);
  }

  createRoutineInstance(routine_id: string): Promise<routine_instance> {
    return this.prisma.routine_instance.create({ data: { routine_id } });
  }

  createTimeRoutineInstance(
    routine_instance_id: string,
    goal: number,
  ): Promise<time_routine_instance> {
    return this.prisma.time_routine_instance.create({
      data: { routine_instance_id, goal, progress: 0 },
    });
  }

  createCountRoutineInstance(
    routine_instance_id: string,
    goal: number,
  ): Promise<count_routine_instance> {
    return this.prisma.count_routine_instance.create({
      data: { routine_instance_id, goal, progress: 0 },
    });
  }

  createBoolRoutineInstance(
    routine_instance_id: string,
    goal: boolean,
  ): Promise<bool_routine_instance> {
    return this.prisma.bool_routine_instance.create({
      data: { routine_instance_id, goal, progress: false },
    });
  }

  updateTimeRoutineInstance(
    time_routine_instance_id: string,
    goal: number,
  ): Promise<time_routine_instance> {
    return this.prisma.time_routine_instance.update({
      where: { time_routine_instance_id },
      data: { goal },
    });
  }

  updateCountRoutineInstance(
    count_routine_instance_id: string,
    goal: number,
  ): Promise<count_routine_instance> {
    return this.prisma.count_routine_instance.update({
      where: { count_routine_instance_id },
      data: { goal },
    });
  }

  updateBoolRoutineInstance(
    bool_routine_instance_id: string,
    goal: boolean,
  ): Promise<bool_routine_instance> {
    return this.prisma.bool_routine_instance.update({
      where: { bool_routine_instance_id },
      data: { goal },
    });
  }
}
