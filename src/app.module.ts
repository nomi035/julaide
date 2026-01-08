import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TollbitModule } from './integrations/tollbit/tollbit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TollbitModule,
  ],
})
export class AppModule { }
