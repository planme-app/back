import { RoutineType } from '@prisma/client';
import { CreateRoutineDTO } from '../dto/createRoutine.dto';

export interface RoutineService {
  findRoutinesByDate(userId: string, date: string);
  createRoutine(
    userId: string,
    title: string,
    type: RoutineType,
    daysOfWeek: string[],
    goal: string,
  );
}
