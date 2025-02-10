import { Module } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'
import { DrizzleModule } from '@/drizzle/drizzle.module'
import { TransactionRepository } from './transaction.repository'

@Module({
  imports: [DrizzleModule],
  providers: [TransactionService, TransactionRepository],
  controllers: [TransactionController],
})
export class TransactionModule {}
