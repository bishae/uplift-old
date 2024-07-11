// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `uplift_${name}`);

export const posts = createTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const clients = createTable("clients", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  contactInfo: text("contact_info"),
  owner: varchar("owner", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const clientsRelations = relations(clients, ({ many }) => ({
  projects: many(projects),
}));

export const statusEnum = pgEnum("status", [
  "active",
  "completed",
  "on_hold",
  "cancelled",
]);

export const projects = createTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: text("description"),
  status: statusEnum("status").default("active"),
  clientId: integer("client_id").references(() => clients.id),
  owner: varchar("owner", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  client: one(clients, {
    fields: [projects.clientId],
    references: [clients.id],
  }),
}));

export const selectProjectSchema = createSelectSchema(projects);

export const taskStatusEnum = pgEnum("task_status", [
  "todo",
  "in_progress",
  "done",
]);

export const tasks = createTable("tasks", {
  id: serial("id").primaryKey(),
  summery: varchar("name", { length: 256 }),
  description: text("description"),
  status: taskStatusEnum("status").default("todo"),
  projectId: integer("project_id").references(() => projects.id),
  owner: varchar("owner", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const selectTaskSchema = createSelectSchema(tasks);
