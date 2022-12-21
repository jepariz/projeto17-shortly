import { Router } from "express";
import { listsUrl, shortenUrl } from "../controllers/links.controllers.js";
import { urlValidation } from "../middlewares/links.middlewares.js";

const router = Router();

router.post("/urls/shorten", urlValidation, shortenUrl)
router.get("/urls/:id", listsUrl)

export default router