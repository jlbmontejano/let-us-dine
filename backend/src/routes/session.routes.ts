import { Router } from "express";
import {
	createSession,
	createSessionResults,
	getSession,
	getSessionResults,
	getSessions,
} from "../controllers/session.controller";

const router = Router();

router.post("/sessions", createSession);
router.post("/sessions/:sessionId", createSessionResults);
router.get("/sessions/:sessionId", getSession);
router.get("/sessions/:sessionId/results", getSessionResults);
router.get("/sessions", getSessions);

export default router;
