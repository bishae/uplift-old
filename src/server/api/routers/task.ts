import { createTRPCRouter, protectedProcedure } from "../trpc";
import { tasks } from "@/server/db/schema";
import { task } from "@/lib/validation";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const taskRouter = createTRPCRouter({
  all: protectedProcedure
    .input(z.object({ projectId: z.number(), limit: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.tasks.findMany({
        where: eq(tasks.projectId, input.projectId),
        limit: input.limit,
      });
    }),

  one: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.tasks.findFirst({
        where: eq(tasks.id, input.id),
      });
    }),

  create: protectedProcedure.input(task).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(tasks).values({
      summery: input.summery,
      status: input.status,
      owner: ctx.session.userId,
      projectId: input.projectId,
    });
  }),

  update: protectedProcedure.input(task).mutation(async ({ ctx, input }) => {
    if (!input.id) {
      new TRPCError({ message: "Entity was not found", code: "NOT_FOUND" });
      return;
    }

    await ctx.db
      .update(tasks)
      .set({ summery: input.summery, status: input.status })
      .where(eq(tasks.id, input.id));
  }),
});
