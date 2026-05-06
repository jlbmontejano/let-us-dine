import request from "supertest";
import z from "zod";

import app from "../../app";
import { getSessionSchema, postSessionSchema } from "../schemas/index.schema";

const authHeader = { "x-api-key": process.env.ADMIN_API_KEY };

describe("session routes", () => {
  let firstId: string;

  beforeAll(async () => {
    const all = await request(app).get("/api/sessions").set(authHeader);
    firstId = all.body.data[0].uuid;
  });

  describe("POST /api/sessions", () => {
    it("returns 201 for session created successfully", async () => {
      const res = await request(app)
        .post("/api/sessions")
        .send({ totalParticipants: 5 });
      expect(res.status).toBe(201);

      const parsed = postSessionSchema.safeParse(res.body.data);
      expect(parsed.success).toBe(true);
    });

    it("returns 400 for session created with invalid number of participants", async () => {
      const res = await request(app).post("/api/sessions").send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Data validation failed.");
    });
  });

  describe("GET /api/sessions/:id", () => {
    it("returns a single valid session", async () => {
      const res = await request(app).get(`/api/sessions/${firstId}`);
      expect(res.status).toBe(200);

      const parsed = getSessionSchema.safeParse(res.body.data);
      expect(parsed.success).toBe(true);
    });

    it("returns 404 with correct error message when session does not exist", async () => {
      const res = await request(app).get("/api/sessions/99999");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Session not found.");
    });
  });

  describe("GET /api/sessions", () => {
    it("returns all sessions", async () => {
      const res = await request(app).get("/api/sessions").set(authHeader);
      expect(res.status).toBe(200);

      const parsed = z.array(getSessionSchema).safeParse(res.body.data);
      expect(parsed.success).toBe(true);
    });
  });

  describe("POST /api/sessions/:id", () => {
    it("returns 201 when session result is created successfully", async () => {
      const questionnaireData = [
        {
          questionText: "What cuisine are you craving?",
          answerText: "Italian",
        },
        {
          questionText: "How much do you want to spend?",
          answerText: "$ - Budget-friendly",
        },
        {
          questionText: "How far are you willing to travel?",
          answerText: "I'll go anywhere good!",
        },
        {
          questionText: "What kind of bites are you in the mood for?",
          answerText: "A cozy dinner to wind down",
        },
        {
          questionText: "What kind of vibe are you after?",
          answerText: "Perfect for hanging out with the crew",
        },
        {
          questionText: "How picky are you about ratings?",
          answerText: "Only highly rated (4+ stars)",
        },
        {
          questionText:
            "Do you want alcohol or specialty beverages with your meal?",
          answerText: "Craft beer",
        },
      ];

      const userLocation = {
        latitude: -37.78177091160375,
        longitude: 176.316084013414,
      };

      const res = await request(app)
        .post(`/api/sessions/${firstId}`)
        .send({ questionnaireData, userLocation });

      expect(res.status).toBe(201);
    });

    it("returns 400 when data validation fails", async () => {
      const res = await request(app).post(`/api/sessions/${firstId}`).send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Data validation failed.");
    });
  });

  describe("GET /api/sessions/:id/results", () => {
    it("returns 404 with correct error message when session does not exist", async () => {
      const res = await request(app).get("/api/sessions/99999/results");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Session not found.");
    });
  });

  describe("DELETE /api/sessions/cleanup", () => {
    it("returns 204 after successfully deleting old sessions", async () => {
      const res = await request(app)
        .delete("/api/sessions/cleanup")
        .set(authHeader);

      expect(res.status).toBe(204);
    });
  });
});
