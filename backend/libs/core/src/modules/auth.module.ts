import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { VerificationCodesModule } from '../modules/verification-codes.module';
import { jwtConstants } from '@config/config/constants/constants';
import { RoleModule } from './role.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    VerificationCodesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
