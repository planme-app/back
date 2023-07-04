import { Prisma, routine_template } from '@prisma/client';
import { CreateTemplateDto } from '../dto/createTemplate.dto';
import {
  RoutineTemplateIdDTO,
  UpdateTemplateDto,
} from '../dto/updateTemplate.dto';

export interface templateRepositoryInterface {
  template(
    routine_templateWhereUniqueInput: Prisma.routine_templateWhereUniqueInput,
  ): Promise<routine_template | null>;

  templates(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.routine_templateWhereUniqueInput;
    where?: Prisma.routine_templateWhereInput;
    orderBy?: Prisma.routine_templateOrderByWithRelationInput;
  }): Promise<routine_template[]>;

  createTemplate(
    createTemplateDto: CreateTemplateDto,
  ): Promise<routine_template>;

  updateTemplate(
    routineTemplateIdDTO: RoutineTemplateIdDTO,
    updateTemplateDto: UpdateTemplateDto,
  ): Promise<routine_template>;

  deleteTemplate(
    routine_templateWhereUniqueInput: Prisma.routine_templateWhereUniqueInput,
  ): Promise<routine_template | null>;
}
