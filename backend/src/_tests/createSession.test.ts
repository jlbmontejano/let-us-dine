import { createSessionSchema } from "../utils/zod-validation/schemas";

test("test negative number of participants", () => {
  const result = createSessionSchema.safeParse({
    totalParticipants: -1,
  });

  expect(result.success).toBe(false);
});

test("test negative number of participants", () => {
  const result = createSessionSchema.safeParse({
    totalParticipants: 1_000,
  });

  expect(result.success).toBe(false);
});
