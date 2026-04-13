import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getAllChallenges, getChallengeById, postChallenge } from "../controllers/challengeControllers.js"
import { joinChallenge, leaveChallenge } from "../controllers/joinControllers.js";

const router = express.Router();

router.get("/", getAllChallenges);
router.post("/", postChallenge);
router.get("/:id", getChallengeById);
router.post("/:id/join", authMiddleware, joinChallenge);
router.delete("/:id/leave", authMiddleware, leaveChallenge);

export default router;