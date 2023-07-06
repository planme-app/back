import { CreateTemplateDto } from '../dto/createTemplate.dto';
import { UpdateTemplateDto } from '../dto/updateTemplate.dto';
import { TemplateEntity, TemplateList } from '../template.entity';

export interface TemplateServiceInterface {
  getTemplate(): Promise<TemplateList>;
  getTemplateById(
    routineTemplateIdDTO: RoutineTemplateIdDTO,
  ): Promise<TemplateEntity>;
  createTemplate(createTemplateDto: CreateTemplateDto): Promise<TemplateEntity>;
  updateTemplate(updateTemplateDto: UpdateTemplateDto): Promise<TemplateEntity>;
}
