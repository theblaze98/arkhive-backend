import { DrizzleModule } from '@/drizzle/drizzle.module'
import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '@/users/users.service'
import { UserRepository } from '@/users/user.repository'
import { LocalStrategy } from './helpers/local.strategy'
import { JwtStrategy } from './helpers/jwt.strategy'

@Module({
  imports: [DrizzleModule, UsersModule],
  providers: [
    AuthService,
    UsersService,
    UserRepository,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
