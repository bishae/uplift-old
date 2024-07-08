import { statusEnum } from "@/server/db/schema";
import { z } from "zod";

export const projectSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(statusEnum.enumValues),
});
