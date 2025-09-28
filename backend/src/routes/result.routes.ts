import { Router } from "express";
import { getResult, getResults } from "../controllers/result.controller";
import requireApiKey from "../middleware/requireKey";
import validateParams from "../middleware/validateParams";

const router = Router();

router.get("/:id", validateParams, requireApiKey, getResult);
router.get("/", requireApiKey, getResults);

export default router;
