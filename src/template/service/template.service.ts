import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from '../dto/createTemplate.dto';
import { TemplateRepository } from '../repository/template.repository';
import { TemplateEntity, TemplateList } from '../template.entity';
import { TemplateServiceInterface } from './template.interface';
import { routine_template } from '@prisma/client';

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

  async getTemplate(): Promise<TemplateList> {
    const templates = await this.templateRepository.templates({});
    const groupedBySection = this.groupBySection(templates);
    return groupedBySection;
  }

  groupBySection(templates: routine_template[]) {
    const init: { [index: string]: TemplateEntity[] } = {};
    const result = templates.reduce((groupTemplate, template) => {
      const { section } = template;
      if (groupTemplate[section]) {
        groupTemplate[section].push({
          routineTemplateId: template.routine_template_id,
          title: template.title,
          logoUrl: template.logo_url,
          section: template.section,
          type: template.type,
        });
      } else {
        groupTemplate[section] = [
          {
            routineTemplateId: template.routine_template_id,
            title: template.title,
            logoUrl: template.logo_url,
            section: template.section,
            type: template.type,
          },
        ];
      }
      return groupTemplate;
    }, init);
    return result;
  }
}
