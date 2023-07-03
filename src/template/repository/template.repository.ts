import { Injectable } from '@nestjs/common';
import { Prisma, routine_template } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTemplateDto } from '../dto/createTemplate.dto';
import { templateRepositoryInterface } from './template.interface';

@Injectable()
export class TemplateRepository implements templateRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async template(
    routine_templateWhereUniqueInput: Prisma.routine_templateWhereUniqueInput,
  ): Promise<routine_template | null> {
    return this.prisma.routine_template.findUnique({
      where: routine_templateWhereUniqueInput,
    });
  }

  async templates(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.routine_templateWhereUniqueInput;
    where?: Prisma.routine_templateWhereInput;
    orderBy?: Prisma.routine_templateOrderByWithRelationInput;
  }): Promise<routine_template[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.routine_template.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTemplate(
    CreateTemplateDto: CreateTemplateDto,
  ): Promise<routine_template> {
    const { title, logoUrl, section, type } = CreateTemplateDto;
    return this.prisma.routine_template.create({
      data: {
        title,
        logo_url: logoUrl,
        section,
        type,
      },
    });
  }

  async getTemplate(): Promise<routine_template[]> {
    return this.prisma.routine_template.findMany();
  }
}
