import type { tasks, projects, customers } from "@/server/db/schema";

type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

type SelectProject = typeof projects.$inferSelect;
type InsertProject = typeof projects.$inferInsert;

type SelectTask = typeof tasks.$inferSelect;
type InsertTask = typeof tasks.$inferInsert;

type SelectCustomer = typeof customers.$inferSelect;
type InsertCustomer = typeof customers.$inferInsert;
