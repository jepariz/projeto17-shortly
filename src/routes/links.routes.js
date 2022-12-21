import { Router } from "express";
import { shortenUrl } from "../controllers/links.controllers.js";
import { urlValidation } from "../middlewares/links.middlewares.js";

const router = Router();

router.post("/urls/shorten", urlValidation, shortenUrl)

export default router