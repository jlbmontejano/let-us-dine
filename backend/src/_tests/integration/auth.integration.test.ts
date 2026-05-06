import request from "supertest";

import app from "@/app";

describe("auth routes", () => {
  describe("GET /api/results/:id", () => {
    it("returns 401 Unauthorized when no API key is provided", async () => {
      const res = await request(app).get(`/api/results/1`);
      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/results", () => {
    it("returns 401 Unauthorized when no API key is provided", async () => {
      const res = await request(app).get(`/api/results`);
      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/sessions", () => {
    it("returns 401 Unauthorized when no API key is provided", async () => {
      const res = await request(app).get(`/api/sessions`);
      expect(res.status).toBe(401);
    });
  });

  describe("DELETE /api/sessions/cleanup", () => {
    it("returns 401 Unauthorized when no API key is provided", async () => {
      const res = await request(app).delete(`/api/sessions/cleanup`);
      expect(res.status).toBe(401);
    });
  });
});
