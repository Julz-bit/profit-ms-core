import { Module } from '@nestjs/common';
import { ScopeService } from './scope.service';
import { ScopeController } from './scope.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ScopeController],
  providers: [
    ScopeService,
    PrismaService
  ]
})
export class ScopeModule { }
