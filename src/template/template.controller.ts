import { Controller, Post, Body } from '@nestjs/common';
import { TemplateService } from './service/template.service';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { TemplateEntity } from './template.entity';

@Controller('api/template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async create(
    @Body() createTemplateDto: CreateTemplateDto,
  ): Promise<TemplateEntity> {
    const template = await this.templateService.createTemplate(
      createTemplateDto,
    );
    return template;
  }
}
