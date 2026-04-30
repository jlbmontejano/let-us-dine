import { Router } from "express";
import {
  createSession,
  createSessionResult,
  getSession,
  getSessionResults,
  getSessions,
  deleteSessions,
} from "../controllers/session.controller";
import requireApiKey from "../middleware/requireKey";
import validateParams from "../middleware/validateParams";

const router = Router();

router.post("/", createSession);
router.post("/:id", validateParams, createSessionResult);
router.get("/:id", validateParams, getSession);
router.get("/", requireApiKey, getSessions);
router.get("/:id/results", validateParams, getSessionResults);
router.delete("/cleanup", requireApiKey, deleteSessions);

export default router;
