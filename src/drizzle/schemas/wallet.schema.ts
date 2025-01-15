import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

export const walletTable = pgTable('wallets', {
  id: varchar('id', { length: 255 }).primaryKey().unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 255 }).notNull(),
  balance: varchar('balance', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
