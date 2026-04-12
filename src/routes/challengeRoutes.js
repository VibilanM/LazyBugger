import express from "express";
import authMiddleware from "../middleware/auth.js";
import { joinChallenge } from "../controllers/joinControllers.js";

const router = express.Router();

import { getAllChallenges, getChallengeById, postChallenge } from "../controllers/challengeControllers.js"

router.get("/", getAllChallenges);
router.post("/", postChallenge);
router.get("/:id", getChallengeById);
router.post("/:id/join", authMiddleware, joinChallenge);

export default router;