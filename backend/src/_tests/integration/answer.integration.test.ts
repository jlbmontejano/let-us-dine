import request from "supertest";
import z from "zod";

import { getAnswerSchema } from "@/_tests/schemas/index.schema";
import app from "@/app";

describe("answer routes", () => {
  describe("GET /api/answers/:id", () => {
    it("returns a single valid answer", async () => {
      const res = await request(app).get("/api/answers/1");
      expect(res.status).toBe(200);

      const parsed = getAnswerSchema.safeParse(res.body.data);
      expect(parsed.success).toBe(true);
    });

    it("returns 404 with correct error message when answer does not exist", async () => {
      const res = await request(app).get("/api/answers/99999");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Answer not found.");
    });
  });

  describe("GET /api/answers", () => {
    it("returns all answers", async () => {
      const res = await request(app).get("/api/answers");
      expect(res.status).toBe(200);

      const parsed = z.array(getAnswerSchema).safeParse(res.body.data);
      expect(parsed.success).toBe(true);
    });
  });
});
