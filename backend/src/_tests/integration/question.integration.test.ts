import request from "supertest";
import z from "zod";

import { getQuestionSchema } from "@/_tests/schemas/index.schema";
import app from "@/app";

describe("question routes", () => {
  describe("GET /api/questions/:id", () => {
    it("returns a single valid question", async () => {
      const res = await request(app).get("/api/questions/1");
      expect(res.status).toBe(200);

      const parsed = getQuestionSchema.safeParse(res.body.data);
      expect(parsed.success).toBe(true);
    });

    it("returns 404 with correct error message when question does not exist", async () => {
      const res = await request(app).get("/api/questions/99999");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Question not found.");
    });
  });

  describe("GET /api/questions", () => {
    it("returns all questions", async () => {
      const res = await request(app).get("/api/questions");
      expect(res.status).toBe(200);

      const parsed = z.array(getQuestionSchema).safeParse(res.body.data);
      expect(parsed.success).toBe(true);
    });
  });
});
