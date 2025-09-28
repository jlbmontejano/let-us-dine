import { Router } from "express";
import { getAnswer, getAnswers } from "../controllers/answer.controller";
import validateParams from "../middleware/validateParams";

const router = Router();

router.get("/:id", validateParams, getAnswer);
router.get("/", getAnswers);

export default router;
