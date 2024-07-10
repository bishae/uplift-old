import { createTRPCRouter, protectedProcedure } from "../trpc";
import { tasks } from "@/server/db/schema";
import { task } from "@/lib/validation";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const taskRouter = createTRPCRouter({
  all: protectedProcedure
    .input(z.object({ projectId: z.number(), limit: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.tasks.findMany({
        where: eq(tasks.projectId, input.projectId),
        limit: input.limit,
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
});
