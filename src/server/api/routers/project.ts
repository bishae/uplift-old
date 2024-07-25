import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  customers,
  expenses,
  projects,
  projectStatusEnum,
} from "@/server/db/schema";
import { and, eq, getTableColumns, sum } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  many: protectedProcedure
    .input(z.object({ limit: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.projects.findMany({
        where: eq(projects.owner, ctx.session.orgId ?? ctx.session.userId),
        limit: input.limit,
        with: { customer: true },
      });
    }),

  single: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const project = (
        await ctx.db
          .select({
            ...getTableColumns(projects),
            expense: sum(expenses.amount),
            customer: {
              name: customers.name,
            },
          })
          .from(projects)
          .where(eq(projects.id, input.id))
          .leftJoin(customers, eq(customers.id, projects.customerId))
          .leftJoin(expenses, eq(projects.id, expenses.projectId))
          .groupBy(projects.id, customers.name)
      )[0];

      return project;
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        status: z.enum(projectStatusEnum.enumValues),
        budget: z.string(),
        dueDate: z.date(),
        customerId: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(projects).values({
        ...input,
        dueDate: new Date(
          input.dueDate.getTime() +
            Math.abs(input.dueDate.getTimezoneOffset() * 60000),
        ),
        createdBy: ctx.session.userId,
        updatedBy: ctx.session.userId,
        owner: ctx.session.orgId ?? ctx.session.userId,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        status: z.enum(projectStatusEnum.enumValues),
        budget: z.string(),
        dueDate: z.date(),
        customerId: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.id)
        throw new TRPCError({
          message: "Entity id needs to be provided",
          code: "BAD_REQUEST",
        });

      await ctx.db
        .update(projects)
        .set({
          ...input,
          dueDate: new Date(
            input.dueDate.getTime() +
              Math.abs(input.dueDate.getTimezoneOffset() * 60000),
          ),
        })
        .where(
          and(
            eq(projects.id, input.id),
            eq(projects.owner, ctx.session.orgId ?? ctx.session.userId),
          ),
        );
    }),

  expense: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const results = await ctx.db
        .select({
          budget: projects.budget,
          total_expense: sum(expenses.amount),
        })
        .from(projects)
        .leftJoin(expenses, eq(expenses.projectId, projects.id))
        .groupBy(expenses.projectId, projects.budget)
        .where(
          and(
            eq(expenses.projectId, input.id),
            eq(expenses.owner, ctx.session.orgId ?? ctx.session.userId),
          ),
        );
      return results[0];
    }),
});
