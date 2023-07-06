import { Injectable, NotFoundException } from '@nestjs/common';
import { routine_template } from '@prisma/client';
import { TemplateRepository } from '../repository/template.repository';
import { TemplateEntity, TemplateList } from '../template.entity';
import { TemplateServiceInterface } from './template.interface';
import { UpdateTemplateDto } from '../dto/updateTemplate.dto';
import { CreateTemplateDto } from '../dto/createTemplate.dto';
import { RoutineTemplateIdDto } from '../dto/routineTemplateId.dto';

@Injectable()
export class TemplateService implements TemplateServiceInterface {
  constructor(private templateRepository: TemplateRepository) {}

  async createTemplate(
    CreateTemplateDto: CreateTemplateDto,
  ): Promise<TemplateEntity> {
    const { routine_template_id, title, logo_url, section, type } =
      await this.templateRepository.createTemplate(CreateTemplateDto);

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

  async getTemplateById(
    routineTemplateIdDto: RoutineTemplateIdDto,
  ): Promise<TemplateEntity> {
    const { routineTemplateId } = routineTemplateIdDto;
    const { routine_template_id, title, logo_url, section, type } =
      await this.templateRepository.template({
        routine_template_id: routineTemplateId,
      });
    return {
      routineTemplateId: routine_template_id,
      title,
      logoUrl: logo_url,
      section,
      type,
    };
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

  async updateTemplate(
    updateTemplateDto: UpdateTemplateDto,
  ): Promise<TemplateEntity> {
    const foundTemplate = await this.templateRepository.template({
      routine_template_id: updateTemplateDto.routineTemplateId,
    });

    if (!foundTemplate) {
      throw new NotFoundException(
        `Can't find template with id ${updateTemplateDto.routineTemplateId}`,
      );
    }

    const { routine_template_id, title, logo_url, section, type } =
      await this.templateRepository.updateTemplate(updateTemplateDto);

    return {
      routineTemplateId: routine_template_id,
      title,
      logoUrl: logo_url,
      section,
      type,
    };
  }

  async deleteTemplate(
    routineTemplateIdDto: RoutineTemplateIdDto,
  ): Promise<TemplateEntity> {
    const { routineTemplateId } = routineTemplateIdDto;
    const foundTemplate = await this.templateRepository.template({
      routine_template_id: routineTemplateId,
    });

    if (!foundTemplate) {
      throw new NotFoundException(
        `Can't find Board with id ${routineTemplateId}`,
      );
    }

    const { routine_template_id, title, logo_url, section, type } =
      await this.templateRepository.deleteTemplate({
        routine_template_id: routineTemplateId,
      });

    return {
      routineTemplateId: routine_template_id,
      title,
      logoUrl: logo_url,
      section,
      type,
    };
  }
}
