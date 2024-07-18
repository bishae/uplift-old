import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  expenses,
  projects,
  statusEnum,
  updateProjectSchema,
} from "@/server/db/schema";
import { and, eq, sum } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  all: protectedProcedure
    .input(z.object({ limit: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.projects.findMany({
        where: eq(projects.owner, ctx.session.userId),
        limit: input.limit,
        with: { client: true },
      });
    }),

  one: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.projects.findFirst({
        where: and(
          eq(projects.id, input.id),
          eq(projects.owner, ctx.session.userId),
        ),
        with: { client: true, expenses: true },
      });
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
        .where(eq(expenses.projectId, input.id));
      return results[0];
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        status: z.enum(statusEnum.enumValues),
        budget: z.string(),
        clientId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(projects).values({
        name: input.name,
        status: input.status,
        budget: input.budget,
        clientId: parseInt(input.clientId),
        owner: ctx.session.userId,
      });
    }),

  update: protectedProcedure
    .input(updateProjectSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id)
        throw new TRPCError({
          message: "Entity id needs to be provided",
          code: "BAD_REQUEST",
        });

      await ctx.db
        .update(projects)
        .set({ status: input.status })
        .where(
          and(
            eq(projects.id, input.id),
            eq(projects.owner, ctx.session.userId),
          ),
        );
    }),
});
