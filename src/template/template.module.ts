import { Module } from '@nestjs/common';
import { TemplateService } from './service/template.service';
import { TemplateController } from './template.controller';
import { PrismaService } from 'src/prisma.service';
import { TemplateRepository } from './repository/template.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository, PrismaService],
})
export class TemplateModule {}
