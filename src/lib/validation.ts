import { statusEnum, taskStatusEnum } from "@/server/db/schema";
import { z } from "zod";

export const project = z.object({
  id: z.number().optional(),
  name: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(statusEnum.enumValues),
});

export const task = z.object({
  summery: z.string(),
  status: z.enum(taskStatusEnum.enumValues),
  projectId: z.number(),
});
