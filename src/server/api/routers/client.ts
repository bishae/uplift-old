import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clients } from "@/server/db/schema";

export const clientRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.clients.findMany({
      where: eq(clients.owner, ctx.session.userId),
    });
  }),
});
