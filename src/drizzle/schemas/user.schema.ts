import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { walletTable } from './wallet.schema'

export const userTable = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey().unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const userRelations = relations(userTable, ({ many }) => ({
  wallets: many(walletTable),
}))
