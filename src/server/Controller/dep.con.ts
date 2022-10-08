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
import { Departments } from '../../entities/Departments';

@Controller('api/department/')
@Injectable()
export class DepControll {
  constructor(
    @InjectRepository(Departments) private RepoDep: Repository<Departments>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const department = await this.RepoDep.find();
      return department;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const department = await this.RepoDep.findOne({
        where: { departmentId: id },
      });
      return department;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const department = await this.RepoDep.save({
        departmentName: fields.departmentName,
        managerId: fields.managerId,
        locationId: fields.locationId,
      });
      return department;
    } catch (error) {
      error.message;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: number) {
    try {
      await this.RepoDep.update(id, {
        departmentName: fields.departmentName,
      });
      return await this.RepoDep.findOne({ where: { departmentId: id } });
    } catch (error) {
      error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const department = await this.RepoDep.delete(id);
      return 'Delete' + department.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
