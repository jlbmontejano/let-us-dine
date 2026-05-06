import { createSessionSchema } from "@lud/shared/zod-validation";

describe("createSessionSchema", () => {
  // Valid inputs
  it("accepts the minimum valid value (2)", () => {
    const result = createSessionSchema.safeParse({ totalParticipants: 2 });
    expect(result.success).toBe(true);
  });

  it("accepts the maximum valid value (12)", () => {
    const result = createSessionSchema.safeParse({ totalParticipants: 12 });
    expect(result.success).toBe(true);
  });

  it("accepts a mid-range value", () => {
    const result = createSessionSchema.safeParse({ totalParticipants: 6 });
    expect(result.success).toBe(true);
  });

  // Boundaries
  it("rejects 1 (gt(1) means strictly greater than)", () => {
    const result = createSessionSchema.safeParse({ totalParticipants: 1 });
    expect(result.success).toBe(false);
  });

  it("rejects 13 (one above the maximum)", () => {
    const result = createSessionSchema.safeParse({ totalParticipants: 13 });
    expect(result.success).toBe(false);
  });

  // Coercion behaviour
  it("rejects a numeric string since coercion was removed", () => {
    const result = createSessionSchema.safeParse({ totalParticipants: "5" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-numeric string (coercion produces NaN)", () => {
    const result = createSessionSchema.safeParse({ totalParticipants: "five" });
    expect(result.success).toBe(false);
  });
});
