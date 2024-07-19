import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { customers } from "@/server/db/schema";
import { z } from "zod";

export const customerRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.customers.findMany({
      where: eq(customers.owner, ctx.session.orgId ?? ctx.session.userId),
    });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), contact_info: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(customers).values({
        name: input.name,
        contactInfo: input.contact_info,
        createdBy: ctx.session.userId,
        updatedBy: ctx.session.userId,
        owner: ctx.session.orgId ?? ctx.session.userId,
      });
    }),
});
