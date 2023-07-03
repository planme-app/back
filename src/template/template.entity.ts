import { RoutineType } from '@prisma/client';

export class TemplateEntity {
  routineTemplateId: string;
  title: string;
  logoUrl: string;
  section: string;
  type: RoutineType;
}
