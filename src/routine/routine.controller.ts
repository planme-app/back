import {
  Query,
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RoutineServiceImpl } from './services/routine.service';
import { UserIdDTO, DateStringDTO } from './dto/findRoutinesByDate.dto';
import { CreateRoutineDTO } from './dto/createRoutine.dto';
import { UserService } from '../user/service/user.service';

@Controller('api')
export class RoutineController {
  constructor(
    private readonly routineService: RoutineServiceImpl,
    private readonly userService: UserService,
  ) {}

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

  @Post('user/:userId/routines')
  async createRoutine(
    @Param() userIdDTO: UserIdDTO,
    @Body() createRoutineDTO: CreateRoutineDTO,
  ) {
    const hasUser = await this.userService.getUserByUserId(userIdDTO.userId);

    if (!hasUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User with provided ID not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const newRoutine = await this.routineService.createRoutine(
      userIdDTO.userId,
      createRoutineDTO.title,
      createRoutineDTO.type,
      createRoutineDTO.daysOfWeek,
      createRoutineDTO.goal,
    );

    return {
      routine: newRoutine,
    };
  }
}
