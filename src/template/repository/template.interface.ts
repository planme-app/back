import { Prisma, routine_template } from '@prisma/client';
import { CreateTemplateDto } from '../dto/createTemplate.dto';

export interface templateRepositoryInterface {
  template(
    routine_templateWhereUniqueInput: Prisma.routine_templateWhereUniqueInput,
  ): Promise<routine_template>;

  templates(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.routine_templateWhereUniqueInput;
    where?: Prisma.routine_templateWhereInput;
    orderBy?: Prisma.routine_templateOrderByWithRelationInput;
  }): Promise<routine_template[]>;

  createTemplate(
    CreateTemplateDto: CreateTemplateDto,
  ): Promise<routine_template>;
}
