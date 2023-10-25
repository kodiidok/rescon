import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { SessionItemModule } from './modules/session-item.module';
import { SessionModule } from './modules/session.module';

@Module({
  imports: [SessionItemModule, SessionModule],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
