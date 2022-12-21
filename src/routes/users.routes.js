import { Router } from "express";
import { signUp } from "../controllers/users.controllers.js";
import { userValidation } from "../middlewares/users.middlewares.js";

const router = Router();

router.post("/signup", userValidation, signUp)
//router.post("/signin", signIn)
//router.get("/users/me", getUserLinks)

export default router