import { Module } from '@nestjs/common'
import { DrizzleModule } from './drizzle/drizzle.module'
import { UsersModule } from './users/users.module'
import { CommonModule } from './common/common.module'

@Module({
  imports: [DrizzleModule, UsersModule, CommonModule],
})
export class AppModule {}
