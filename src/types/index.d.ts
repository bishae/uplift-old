import type { tasks, projects } from "@/server/db/schema";

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
