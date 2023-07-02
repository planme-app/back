import { Query, Controller, Get, Param } from '@nestjs/common';
import { RoutineServiceImpl } from './services/routine.service';
import { UserIdDTO, DateStringDTO } from './dto/findRoutinesByDate.dto';

@Controller('api')
export class RoutineController {
  constructor(private readonly routineService: RoutineServiceImpl) {}

  @Get('user/:userId/routines')
  findRoutinesByDate(
    @Param() userIdDTO: UserIdDTO,
    @Query() dateStringDto: DateStringDTO,
  ) {
    try {
      return this.routineService.findRoutinesByDate(
        userIdDTO.userId,
        dateStringDto.date,
      );
    } catch (error) {
      console.error(error);
    }
  }
}
