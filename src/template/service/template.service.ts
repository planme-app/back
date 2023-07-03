import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from '../dto/createTemplate.dto';
import { TemplateRepository } from '../repository/template.repository';
import { TemplateEntity } from '../template.entity';
import { TemplateServiceInterface } from './template.interface';

@Injectable()
export class TemplateService implements TemplateServiceInterface {
  constructor(private templateRepository: TemplateRepository) {}

  async createTemplate(
    createTemplateDto: CreateTemplateDto,
  ): Promise<TemplateEntity> {
    const { routine_template_id, title, logo_url, section, type } =
      await this.templateRepository.createTemplate(createTemplateDto);

    return {
      routineTemplateId: routine_template_id,
      title,
      logoUrl: logo_url,
      section,
      type,
    };
  }
}
