import {
  Query,
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Put,
  Res,
} from '@nestjs/common';
import { RoutineServiceImpl } from './services/routine.service';
import { UserIdDTO, DateStringDTO } from './dto/findRoutinesByDate.dto';
import { CreateRoutineDTO } from './dto/createRoutine.dto';
import { UserService } from '../user/service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { EditRoutineDTO, EditRoutineParamDTO } from './dto/editRoutine.dto';
import { Response } from 'express';

@Controller('api')
@UseGuards(AuthGuard())
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

  @Put('user/:userId/routine/:routineId')
  async editRoutine(
    @Param() paramDTO: EditRoutineParamDTO,
    @Query() dateStringDto: DateStringDTO,
    @Body() editRoutineDTO: EditRoutineDTO,
    @Res() res: Response,
  ) {
    const hasUser = await this.userService.getUserByUserId(paramDTO.userId);

    if (!hasUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User with provided ID not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const hasRoutine = await this.routineService.findRoutineById(
      paramDTO.routineId,
    );

    if (!hasRoutine) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Routine with provided ID not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      this.routineService.editRoutine(
        paramDTO.routineId,
        editRoutineDTO.title,
        editRoutineDTO.daysOfWeek,
        editRoutineDTO.goal,
        dateStringDto.date,
      );

      return res.status(HttpStatus.OK).send();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while editing the routine.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
