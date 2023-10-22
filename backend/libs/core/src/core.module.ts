import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { AbstractModule } from './modules/abstract.module';

@Module({
  imports: [AbstractModule],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
