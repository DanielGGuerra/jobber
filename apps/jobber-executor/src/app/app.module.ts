import { Module } from '@nestjs/common';
import { JobsModules } from './jobs/jobs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JobsModules, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
