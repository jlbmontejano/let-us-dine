import { Router } from "express";
import { getQuestion, getQuestions } from "../controllers/question.controller";
import validateParams from "../middleware/validateParams";

const router = Router();

router.get("/:id", validateParams, getQuestion);
router.get("/", getQuestions);

export default router;
