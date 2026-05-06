import request from "supertest";
import z from "zod";

import { getResultSchema } from "@/_tests/schemas/index.schema";
import app from "@/app";

const authHeader = { "x-api-key": process.env.ADMIN_API_KEY };

describe("result routes", () => {
  let firstId: string;

  beforeAll(async () => {
    const all = await request(app).get("/api/results").set(authHeader);
    firstId = all.body.data[0].id;
  });

  describe("GET /api/results/:id", () => {
    it("returns a single valid result", async () => {
      const res = await request(app)
        .get(`/api/results/${firstId}`)
        .set(authHeader);
      expect(res.status).toBe(200);

      const parsed = getResultSchema.safeParse(res.body.data);
      expect(parsed.success).toBe(true);
    });

    it("returns 404 with correct error message when result does not exist", async () => {
      const res = await request(app).get("/api/results/99999").set(authHeader);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Result not found.");
    });
  });

  describe("GET /api/results", () => {
    it("returns all results", async () => {
      const res = await request(app).get("/api/results").set(authHeader);
      expect(res.status).toBe(200);

      const parsed = z.array(getResultSchema).safeParse(res.body.data);
      expect(parsed.success).toBe(true);
    });
  });
});
