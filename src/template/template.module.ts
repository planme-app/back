import { Module } from '@nestjs/common';
import { TemplateService } from './service/template.service';
import { TemplateController } from './template.controller';
import { PrismaService } from '../prisma.service';
import { TemplateRepository } from './repository/template.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository, PrismaService],
})
export class TemplateModule {}
