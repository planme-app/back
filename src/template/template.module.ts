import { Module } from '@nestjs/common';
import { TemplateService } from './service/template.service';
import { TemplateController } from './template.controller';
import { PrismaService } from 'src/prisma.service';
import { TemplateRepository } from './repository/template.repository';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository, PrismaService],
})
export class TemplateModule {}
