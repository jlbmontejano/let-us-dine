import { createSessionSchema } from "../utils/zod-validation/schemas";

test("Test negative number of participants.", () => {
	const result = createSessionSchema.safeParse({
		totalParticipants: -1,
	});

	expect(result.success).toBe(false);
});

test("Test negative number of participants.", () => {
	const result = createSessionSchema.safeParse({
		totalParticipants: 1_000,
	});

	expect(result.success).toBe(false);
});
