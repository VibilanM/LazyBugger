import express from "express";

const router = express.Router();

import { getAllChallenges, getChallengeById, postChallenge } from "../controllers/challengeControllers.js"

router.get("/", getAllChallenges);
router.post("/", postChallenge);
router.get("/:id", getChallengeById);

export default router;