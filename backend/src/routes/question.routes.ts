import { Router } from "express";
import { getQuestion, getQuestions } from "../controllers/question.controller";

const router = Router();

router.get("/questions/:questionId", getQuestion);
router.get("/questions", getQuestions);

export default router;
