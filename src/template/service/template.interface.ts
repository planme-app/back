import { CreateTemplateDto } from '../dto/createTemplate.dto';
import { RoutineTemplateIdDto } from '../dto/routineTemplateId.dto';
import { UpdateTemplateDto } from '../dto/updateTemplate.dto';
import { TemplateEntity, TemplateList } from '../template.entity';

export interface TemplateServiceInterface {
  getTemplate(): Promise<TemplateList>;
  getTemplateById(
    routineTemplateIdDto: RoutineTemplateIdDto,
  ): Promise<TemplateEntity>;
  createTemplate(createTemplateDto: CreateTemplateDto): Promise<TemplateEntity>;
  deleteTemplate(
    routineTemplateIdDto: RoutineTemplateIdDto,
  ): Promise<TemplateEntity>;
  updateTemplate(updateTemplateDto: UpdateTemplateDto): Promise<TemplateEntity>;
}
