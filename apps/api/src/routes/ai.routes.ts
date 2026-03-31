import { Router } from "express";
import { handleGenerate } from "../controllers/ai.controllers.js";

const router = Router();

router.post("/generate", handleGenerate);

export default router;
