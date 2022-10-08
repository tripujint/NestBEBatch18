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
import { Countries } from '../../entities/Countries';

@Controller('api/country/')
@Injectable()
export class CountryControll {
  constructor(
    @InjectRepository(Countries) private Repo: Repository<Countries>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const country = await this.Repo.find();
      return country;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: string) {
    try {
      const country = await this.Repo.findOne({ where: { countryId: id } });
      return country;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
      const country = await this.Repo.save({
        countryId: fields.countryId,
        countryName: fields.countryName,
        regionId: fields.regionId,
      });
      return country;
    } catch (error) {
      error.message;
    }
  }

  @Put(':id')
  public async Update(@Body() fields: any, @Param('id') id: string) {
    try {
      await this.Repo.update(id, {
        countryName: fields.countryName,
      });
      return await this.Repo.findOne({ where: { countryId: id } });
    } catch (error) {
      error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: string) {
    try {
      const country = await this.Repo.delete(id);
      return 'Delete' + country.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
