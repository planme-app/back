import { CreateTemplateDto } from '../dto/createTemplate.dto';
import { TemplateEntity } from '../template.entity';

export interface TemplateServiceInterface {
  createTemplate(createTemplateDto: CreateTemplateDto): Promise<TemplateEntity>;
}
