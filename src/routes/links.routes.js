import { Router } from "express";
import { listsUrl, redirect, shortenUrl } from "../controllers/links.controllers.js";
import { urlValidation } from "../middlewares/links.middlewares.js";


const router = Router();

router.post("/urls/shorten", urlValidation, shortenUrl)
router.get("/urls/:id", listsUrl)
router.get("/urls/open/:shortUrl", redirect)

export default router