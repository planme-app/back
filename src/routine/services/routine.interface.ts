import { RoutineType, routine } from '@prisma/client';

export interface RoutineService {
  findRoutineById(routineId: string);
  findRoutinesByDate(userId: string, date: string);
  createRoutine(
    userId: string,
    title: string,
    type: RoutineType,
    daysOfWeek: string[],
    goal: string,
  );
  deleteRoutine(routineId: string): Promise<routine>;
}
