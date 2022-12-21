import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controllers.js";
import { signInValidation, userValidation } from "../middlewares/users.middlewares.js";


const router = Router();

router.post("/signup", userValidation, signUp)
router.post("/signin", signInValidation, signIn)
//router.get("/users/me", getUserLinks)

export default router