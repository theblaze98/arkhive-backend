import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { DrizzleModule } from '@/drizzle/drizzle.module'

@Module({
  imports: [DrizzleModule],
  providers: [UsersService],
})
export class UsersModule {}
