import { neon } from '@neondatabase/serverless'

process.loadEnvFile('.env.local')

export const connection = () => {
  return neon(process.env.NEON_DATABASE_URL)
}
