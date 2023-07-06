import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TemplateService } from './service/template.service';
import { TemplateEntity, TemplateList } from './template.entity';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { UpdateTemplateDto } from './dto/updateTemplate.dto';
import { RoutineTemplateIdDto } from './dto/routineTemplateId.dto';

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
  async findAll(): Promise<TemplateList> {
    return this.templateService.getTemplate();
  }

  @Get('/:routineTemplateId')
  async findById(
    @Param() routineTemplateIdDto: RoutineTemplateIdDto,
  ): Promise<TemplateEntity> {
    const template = await this.templateService.getTemplateById(
      routineTemplateIdDto,
    );
    return template;
  }

  @Put()
  async update(
    @Body() updateTemplateDto: UpdateTemplateDto,
  ): Promise<TemplateEntity> {
    const template = await this.templateService.updateTemplate(
      updateTemplateDto,
    );
    return template;
  }

  @Delete()
  async delete(
    @Body() routineTemplateIdDto: RoutineTemplateIdDto,
  ): Promise<TemplateEntity> {
    const template = await this.templateService.deleteTemplate(
      routineTemplateIdDto,
    );
    return template;
  }
}
