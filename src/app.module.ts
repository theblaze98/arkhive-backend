import { Module } from '@nestjs/common'
import { DrizzleModule } from './drizzle/drizzle.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [DrizzleModule, UsersModule],
})
export class AppModule {}
