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
import { Employees } from '../../entities/Employees';

@Controller('api/employee/')
@Injectable()
export class EmpControll {
  constructor(
    @InjectRepository(Employees) private Repo: Repository<Employees>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const employee = await this.Repo.find();
      return employee;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const employee = await this.Repo.findOne({ where: { employeeId: id } });
      return employee;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const employee = await this.Repo.save({
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        phoneNumber: fields.phoneNumber,
        hireDate: fields.hireDate,
        jobId: fields.jobId,
        salary: fields.salary,
        commissionPct: fields.commissionPct,
        managerId: fields.managerId,
        departmentId: fields.departmentId,
      });
      return employee;
    } catch (error) {
      error.message;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: number) {
    try {
      await this.Repo.update(id, {
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        phoneNumber: fields.phoneNumber,
        hireDate: fields.hireDate,
        salary: fields.salary,
        commissionPct: fields.commissionPct,
      });
      return await this.Repo.findOne({ where: { employeeId: id } });
    } catch (error) {
      error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const employee = await this.Repo.delete(id);
      return 'Delete' + employee.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
