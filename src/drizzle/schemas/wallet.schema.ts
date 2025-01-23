import { pgTable, varchar, decimal, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { userTable } from './user.schema'
import { transactionTable } from './transaction.schema'
import { savingGoalTable } from './saving_goal.schema'

export const walletTable = pgTable('wallets', {
  id: varchar('id', { length: 255 }).primaryKey().unique().notNull(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
    }),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 255 }).notNull(),
  balance: decimal('balance', { precision: 4 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const walletRelations = relations(walletTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [walletTable.userId],
    references: [userTable.id],
  }),
  transactions: many(transactionTable),
  savingGoal: one(savingGoalTable),
}))
