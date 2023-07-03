import { Prisma, routine_instance } from '@prisma/client';
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
}
