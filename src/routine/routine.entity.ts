import { RoutineType, routine, routine_instance } from '@prisma/client';

export class RoutineEntity implements routine {
  routine_id: string;
  user_id: string;
  title: string;
  type: RoutineType;
  is_repeat: boolean;
  days_of_week_binary: string;
  created_at: Date;
  deleted_at: Date;
}

export class RoutineInstanceEntity implements routine_instance {
  routine_id: string;
  created_at: Date;
  routine_instance_id: string;
}
