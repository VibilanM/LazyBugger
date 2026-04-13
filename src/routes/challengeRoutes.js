import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getAllChallenges, getChallengeById, postChallenge, getParticipants } from "../controllers/challengeControllers.js"
import { joinChallenge, leaveChallenge } from "../controllers/joinControllers.js";

const router = express.Router();

router.get("/", getAllChallenges);
router.post("/", postChallenge);
router.get("/:id", getChallengeById);
router.post("/:id/join", authMiddleware, joinChallenge);
router.delete("/:id/leave", authMiddleware, leaveChallenge);
router.get("/:id/participants", getParticipants);

export default router;