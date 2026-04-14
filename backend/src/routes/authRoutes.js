import express from "express";
import { signUp, login } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);

export default authRouter;