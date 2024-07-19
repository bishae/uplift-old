import { createTRPCRouter, protectedProcedure } from "../trpc";
import { tasks, taskStatusEnum } from "@/server/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const taskRouter = createTRPCRouter({
  all: protectedProcedure
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

  one: protectedProcedure
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
        projectId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        summery: input.summery,
        description: input.description,
        status: input.status,
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        new TRPCError({ message: "Entity was not found", code: "NOT_FOUND" });
        return;
      }

      await ctx.db
        .update(tasks)
        .set({ summery: input.summery, status: input.status })
        .where(
          and(
            eq(tasks.id, input.id),
            eq(tasks.owner, ctx.session.orgId ?? ctx.session.userId),
          ),
        );
    }),
});
