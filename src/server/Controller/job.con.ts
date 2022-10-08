import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jobs } from '../../entities/Jobs';

@Controller('api/job/')
@Injectable()
export class JobControll {
  constructor(@InjectRepository(Jobs) private Repo: Repository<Jobs>) {}

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
  public async GetOne(@Param('id') id: string) {
    try {
      const job = await this.Repo.findOne({ where: { jobId: id } });
      return job;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const job = await this.Repo.save({
        jobId: fields.jobId,
        jobTitle: fields.jobTitle,
        minSalary: fields.minSalary,
        maxSalary: fields.maxSalary,
      });
      return job;
    } catch (error) {
      error.message;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: string) {
    try {
      await this.Repo.update(id, {
        jobTitle: fields.jobTitle,
        minSalary: fields.minSalary,
        maxSalary: fields.maxSalary,
      });
      return await this.Repo.findOne({ where: { jobId: id } });
    } catch (error) {
      error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: string) {
    try {
      const job = await this.Repo.delete(id);
      return 'Delete' + job.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
