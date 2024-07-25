// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  date,
  integer,
  numeric,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `uplift_${name}`);

export const customers = createTable("customers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  contactInfo: text("contact_info").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
  updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  owner: varchar("owner", { length: 256 }).notNull(),
});

export const customersRelations = relations(customers, ({ many }) => ({
  projects: many(projects),
}));

export const projectStatusEnum = pgEnum("status", [
  "active",
  "completed",
  "on_hold",
  "cancelled",
]);

export const projects = createTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description").default("").notNull(),
  status: projectStatusEnum("status").default("active").notNull(),
  budget: numeric("budget", { precision: 10, scale: 2 }).notNull(),
  dueDate: date("due_date", { mode: "date" }).notNull(),
  customerId: integer("customer_id").references(() => customers.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
  updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  owner: varchar("owner", { length: 256 }).notNull(),
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
  customer: one(customers, {
    fields: [projects.customerId],
    references: [customers.id],
  }),
  expenses: many(expenses),
}));

export const taskStatusEnum = pgEnum("task_status", [
  "todo",
  "in_progress",
  "done",
]);

export const tasks = createTable("tasks", {
  id: serial("id").primaryKey(),
  summery: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  status: taskStatusEnum("status").notNull(),
  dueDate: date("due_date", { mode: "date" }).notNull(),
  cost: numeric("cost", { precision: 10, scale: 2 }).notNull(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
  updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  owner: varchar("owner", { length: 256 }).notNull(),
});

export const expenses = createTable("expenses", {
  id: serial("id").primaryKey(),
  note: varchar("note", { length: 256 }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
  updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  owner: varchar("owner", { length: 256 }).notNull(),
});

export const expensesRelations = relations(expenses, ({ one }) => ({
  project: one(projects, {
    fields: [expenses.projectId],
    references: [projects.id],
  }),
}));
