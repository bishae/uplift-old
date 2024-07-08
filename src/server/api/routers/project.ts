import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { projects } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { projectSchema } from "@/lib/inputSchema";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  all: protectedProcedure
    .input(z.object({ limit: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.owner, ctx.session.userId))
        .limit(input.limit);
    }),

  one: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.projects.findFirst({
        where: and(
          eq(projects.id, input.id),
          eq(projects.owner, ctx.session.userId),
        ),
      });
    }),

  create: protectedProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(projects)
        .values({ ...input, owner: ctx.session.userId });
    }),

  update: protectedProcedure
    .input(projectSchema)
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