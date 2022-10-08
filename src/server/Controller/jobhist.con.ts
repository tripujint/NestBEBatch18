import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobHistory } from '../../entities/JobHistory';

@Controller('api/jobhistory')
@Injectable()
export class JobHistControll {
  constructor(
    @InjectRepository(JobHistory) private Repo: Repository<JobHistory>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const job = await this.Repo.find();
      return job;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const job = await this.Repo.findOne({ where: { employeeId: id } });
      return job;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const job = await this.Repo.save({
        employeeId: fields.employeeId,
        startDate: fields.startDate,
        endDate: fields.endDate,
        jobId: fields.jobId,
        departmentId: fields.departmentId,
      });
      return job;
    } catch (error) {
      error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const job = await this.Repo.delete(id);
      return 'Delete' + job.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
