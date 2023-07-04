import { CreateTemplateDto } from '../dto/createTemplate.dto';
import {
  UpdateTemplateDto,
  RoutineTemplateIdDTO,
} from '../dto/updateTemplate.dto';
import { TemplateEntity, TemplateList } from '../template.entity';

export interface TemplateServiceInterface {
  getTemplate(): Promise<TemplateList>;
  getTemplateById(
    routineTemplateIdDTO: RoutineTemplateIdDTO,
  ): Promise<TemplateEntity>;
  createTemplate(createTemplateDto: CreateTemplateDto): Promise<TemplateEntity>;
  updateTemplate(
    routineTemplateIdDTO: RoutineTemplateIdDTO,
    updateTemplateDto: UpdateTemplateDto,
  ): Promise<TemplateEntity>;
  deleteTemplate(
    routineTemplateIdDTO: RoutineTemplateIdDTO,
  ): Promise<TemplateEntity>;
}
