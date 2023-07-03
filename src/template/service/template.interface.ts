import { CreateTemplateDto } from '../dto/createTemplate.dto';
import { TemplateEntity, TemplateList } from '../template.entity';

export interface TemplateServiceInterface {
  createTemplate(createTemplateDto: CreateTemplateDto): Promise<TemplateEntity>;
  getTemplate(): Promise<TemplateList>;
}
