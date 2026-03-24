import express from "express";

const router = express.Router();

import { getAllChallenges, postChallenge } from "../controllers/challengeControllers.js"

router.get("/", getAllChallenges);
router.post("/", postChallenge);

export default router;