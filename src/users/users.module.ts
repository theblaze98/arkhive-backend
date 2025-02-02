import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { DrizzleModule } from '@/drizzle/drizzle.module'
import { UserRepository } from './user.repository'

@Module({
  imports: [DrizzleModule],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
