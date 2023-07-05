import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoutineModule } from './routine/routine.module';
import { TemplateModule } from './template/template.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, RoutineModule, TemplateModule, AuthModule],
})
export class AppModule {}
