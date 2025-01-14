import { Router } from "express";
import { getAnswer, getAnswers } from "../controllers/answer.controller";

const router = Router();

router.get("/answers/:answerId", getAnswer);
router.get("/answers", getAnswers);

export default router;
