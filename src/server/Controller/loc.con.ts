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
import { Locations } from '../../entities/Locations';

@Controller('api/location/')
@Injectable()
export class LocControll {
  constructor(
    @InjectRepository(Locations) private Repo: Repository<Locations>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const location = await this.Repo.find();
      return location;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const location = await this.Repo.findOne({ where: { locationId: id } });
      return location;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const location = await this.Repo.save({
        streetAddress: fields.streetAddress,
        postalCode: fields.postalCode,
        city: fields.city,
        stateProvince: fields.stateProvince,
      });
      return location;
    } catch (error) {
      error.message;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: number) {
    try {
      await this.Repo.update(id, {
        streetAddress: fields.streetAddress,
        postalCode: fields.postalCode,
        city: fields.city,
        stateProvince: fields.stateProvince,
      });
      return await this.Repo.findOne({ where: { locationId: id } });
    } catch (error) {
      error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const location = await this.Repo.delete(id);
      return 'Delete' + location.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
