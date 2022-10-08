import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from '../entities/Regions';
import { Countries } from '../entities/Countries';
import { Departments } from '../entities/Departments';
import { Jobs } from '../entities/Jobs';
import { JobHistory } from '../entities/JobHistory';
import { Locations } from '../entities/Locations';
import { Employees } from '../entities/Employees';
import { MulterModule } from '@nestjs/platform-express';
import { RegControll } from './Controller/reg.con';
import { CountryControll } from './Controller/country.con';
import { DepControll } from './Controller/dep.con';
import { JobControll } from './Controller/job.con';
import { JobHistControll } from './Controller/jobhist.con';
import { LocControll } from './Controller/loc.con';
import { EmpControll } from './Controller/emp.con';
import { ConfigMulter } from './Middleware/multer.conf';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Regions,
      Countries,
      Departments,
      Jobs,
      JobHistory,
      Locations,
      Employees,
    ]),
    MulterModule.register(ConfigMulter.UploadFiles()),
  ],
  providers: [],
  controllers: [
    RegControll,
    CountryControll,
    DepControll,
    JobControll,
    JobHistControll,
    LocControll,
    EmpControll,
  ],
})
export class ServerModule {}
