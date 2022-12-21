import { Router } from "express";
import { deleteUrl, listsUrl, redirect, shortenUrl } from "../controllers/links.controllers.js";
import { urlOwnerValidation, urlValidation } from "../middlewares/links.middlewares.js";

const router = Router();

router.post("/urls/shorten", urlValidation, shortenUrl)
router.get("/urls/:id", listsUrl)
router.get("/urls/open/:shortUrl", redirect)
router.delete("/urls/:id", urlOwnerValidation, deleteUrl)

export default router