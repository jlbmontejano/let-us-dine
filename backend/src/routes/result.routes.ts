import { Router } from "express";
import { getResult, getResults } from "../controllers/result.controller";

const router = Router();

router.get("/results/:resultId", getResult);
router.get("/results", getResults);

export default router;
