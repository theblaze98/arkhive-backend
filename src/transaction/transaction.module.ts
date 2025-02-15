import { Module } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'
import { DrizzleModule } from '@/drizzle/drizzle.module'
import { TransactionRepository } from './transaction.repository'
import { WalletModule } from '@/wallet/wallet.module'

@Module({
  imports: [DrizzleModule, WalletModule],
  providers: [TransactionService, TransactionRepository],
  controllers: [TransactionController],
})
export class TransactionModule {}
