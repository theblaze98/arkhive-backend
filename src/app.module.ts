import { Module } from '@nestjs/common'
import { DrizzleModule } from './drizzle/drizzle.module'
import { UsersModule } from './users/users.module'
import { CommonModule } from './common/common.module'
import { AuthModule } from './auth/auth.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { WalletModule } from './wallet/wallet.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    DrizzleModule,
    UsersModule,
    CommonModule,
    AuthModule,
    WalletModule,
  ],
})
export class AppModule {}
