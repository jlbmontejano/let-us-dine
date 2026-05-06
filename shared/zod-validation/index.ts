import { z } from "zod";

export const createSessionSchema = z.object({
  totalParticipants: z
    .number()
    .gt(1, "Number must be between 2 and 12")
    .lte(12, "Number must be between 2 and 12"),
});
