import { Module } from '@nestjs/common'
import { WalletService } from './wallet.service'
import { WalletController } from './wallet.controller'
import { WalletRepository } from './wallet.repository'
import { DrizzleModule } from '@/drizzle/drizzle.module'

@Module({
  imports: [DrizzleModule],
  providers: [WalletService, WalletRepository],
  controllers: [WalletController],
})
export class WalletModule {}
