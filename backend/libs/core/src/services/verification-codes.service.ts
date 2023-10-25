import { Injectable, NotFoundException } from '@nestjs/common';
import { VerificationCode } from '../entities/verification-codes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VerificationCodesService {
  constructor(
    @InjectRepository(VerificationCode)
    private readonly verificationCodeRepository: Repository<VerificationCode>,
  ) {}

}
