import { Module } from '@nestjs/common';
import { SchoolModule } from 'src/use-case/school/school.module';
import { SchoolController } from './school.controller';

@Module({
  imports: [SchoolModule],
  controllers: [SchoolController],
})
export class SchoolControllerModule {}
