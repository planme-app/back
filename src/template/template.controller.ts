import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TemplateService } from './service/template.service';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { TemplateEntity } from './template.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/template')
@UseGuards(AuthGuard())
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

  @Get()
  async findAll() {
    return this.templateService.getTemplate();
  }
}
