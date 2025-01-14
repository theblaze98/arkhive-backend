import { Module } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/neon-http'
import { DRIZZLE_PROVIDER } from '@/helpers/const'
import { connection } from './helpers/connection'
import * as schema from './schemas'

@Module({
  providers: [
    {
      provide: DRIZZLE_PROVIDER,
      useFactory: async () => {
        try {
          return drizzle(connection(), { schema })
        } catch (error) {
          console.log(error)
        }
      },
    },
  ],
})
export class DrizzleModule {}
