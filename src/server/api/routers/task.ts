import { createTRPCRouter, protectedProcedure } from "../trpc";
import { tasks, taskStatusEnum } from "@/server/db/schema";
import { z } from "zod";
import { and, eq, sum } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const taskRouter = createTRPCRouter({
  many: protectedProcedure
    .input(z.object({ projectId: z.number(), limit: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.tasks.findMany({
        limit: input.limit,
        where: and(
          eq(tasks.projectId, input.projectId),
          eq(tasks.owner, ctx.session.orgId ?? ctx.session.userId),
        ),
      });
    }),

  single: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.tasks.findFirst({
        where: and(
          eq(tasks.id, input.id),
          eq(tasks.owner, ctx.session.orgId ?? ctx.session.userId),
        ),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        summery: z.string(),
        description: z.string(),
        status: z.enum(taskStatusEnum.enumValues),
        cost: z.string(),
        dueDate: z.date(),
        projectId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        summery: input.summery,
        description: input.description,
        status: input.status,
        cost: input.cost,
        dueDate: new Date(
          input.dueDate.getTime() +
            Math.abs(input.dueDate.getTimezoneOffset() * 60000),
        ),
        projectId: input.projectId,
        createdBy: ctx.session.userId,
        updatedBy: ctx.session.userId,
        owner: ctx.session.orgId ?? ctx.session.userId,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        summery: z.string(),
        status: z.enum(taskStatusEnum.enumValues),
        cost: z.string(),
        dueDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        new TRPCError({ message: "Entity was not found", code: "NOT_FOUND" });
        return;
      }

      await ctx.db
        .update(tasks)
        .set({
          summery: input.summery,
          status: input.status,
          cost: input.cost,
          dueDate: new Date(
            input.dueDate.getTime() +
              Math.abs(input.dueDate.getTimezoneOffset() * 60000),
          ),
        })
        .where(
          and(
            eq(tasks.id, input.id),
            eq(tasks.owner, ctx.session.orgId ?? ctx.session.userId),
          ),
        );
    }),

  cost: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ ctx, input }) => {
      const results = await ctx.db
        .select({
          cost: sum(tasks.cost),
        })
        .from(tasks)
        .where(
          and(
            eq(tasks.status, "done"),
            eq(tasks.projectId, input.projectId),
            eq(tasks.owner, ctx.session.orgId ?? ctx.session.userId),
          ),
        )
        .groupBy(tasks.projectId);

      return results[0];
    }),
});
