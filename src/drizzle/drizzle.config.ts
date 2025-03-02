import { defineConfig } from 'drizzle-kit'

if (process.env.NODE_ENV === 'development') {
  process.loadEnvFile('.env.local')
}

export default defineConfig({
  schema: ['src/drizzle/schemas/*.ts'],
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  out: 'drizzle-migrations',
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL,
  },
})
