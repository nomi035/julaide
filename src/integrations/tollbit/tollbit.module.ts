import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TollbitService } from './tollbit.service';
import { TollbitClient } from './tollbit.client';
import { TollbitMapper } from './tollbit.mapper';
import { TollbitController } from './tollbit.controller';

@Module({
  imports: [HttpModule],
  controllers: [TollbitController],
  providers: [TollbitService, TollbitClient, TollbitMapper],
  exports: [TollbitService],
})
export class TollbitModule { }
