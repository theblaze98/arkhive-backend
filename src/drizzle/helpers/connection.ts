import { neon } from '@neondatabase/serverless'

if (process.env.NODE_ENV === 'development') {
  process.loadEnvFile('.env.local')
}

export const connection = () => {
  return neon(process.env.NEON_DATABASE_URL)
}
