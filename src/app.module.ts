import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoutineModule } from './routine/routine.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [UserModule, RoutineModule, TemplateModule],
})
export class AppModule {}
