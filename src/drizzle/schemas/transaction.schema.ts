import { pgTable, varchar, decimal, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { walletTable } from './wallet.schema'

export const transactionTable = pgTable('transactions', {
  id: varchar('id', { length: 255 }).primaryKey().unique().notNull(),
  walletId: varchar('wallet_id', { length: 255 })
    .notNull()
    .references(() => walletTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  type: varchar('type', { length: 255 }).notNull(),
  amount: decimal('amount', { precision: 2 }).notNull(),
  decription: text('decription').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const transactionRelations = relations(transactionTable, ({ one }) => ({
  wallet: one(walletTable, {
    fields: [transactionTable.walletId],
    references: [walletTable.id],
  }),
}))
