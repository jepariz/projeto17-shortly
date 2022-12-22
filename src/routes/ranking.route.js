import { Router } from "express";
import { ranking } from "../controllers/ranking.controllers.js";


const router = Router();

router.get("/ranking", ranking)

export default router