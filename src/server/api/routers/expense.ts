import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { expenses } from "@/server/db/schema";

export const expenseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ note: z.string(), amount: z.string(), projectId: z.number() }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(expenses).values(input);
    }),
});
