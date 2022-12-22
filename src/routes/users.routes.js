import { Router } from "express";
import {
  getUserLinks,
  signIn,
  signUp,
} from "../controllers/users.controllers.js";
import {
  headerValidation,
  signInValidation,
  userValidation,
} from "../middlewares/users.middlewares.js";

const router = Router();

router.post("/signup", userValidation, signUp);
router.post("/signin", signInValidation, signIn);
router.get("/users/me", headerValidation, getUserLinks);

export default router;
