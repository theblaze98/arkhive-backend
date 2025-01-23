import {
  pgTable,
  varchar,
  decimal,
  text,
  timestamp,
  date,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { walletTable } from './wallet.schema'

export const savingGoalTable = pgTable('saving_goals', {
  id: varchar('id', { length: 255 }).primaryKey().unique().notNull(),
  walletId: varchar('wallet_id', { length: 255 })
    .notNull()
    .references(() => walletTable.id, {
      onDelete: 'cascade',
    }),
  name: text('name').notNull(),
  targetAmount: decimal('target_amount', { precision: 2 }).notNull(),
  currentAmount: decimal('current_amount', { precision: 2 }).notNull(),
  deadline: date('target_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const savingGoalRelations = relations(savingGoalTable, ({ one }) => ({
  wallet: one(walletTable, {
    fields: [savingGoalTable.walletId],
    references: [walletTable.id],
  }),
}))
