import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "./routers/project";
import { taskRouter } from "./routers/task";
import { expenseRouter } from "./routers/expense";
import { customerRouter } from "./routers/customer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  task: taskRouter,
  customer: customerRouter,
  expense: expenseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
