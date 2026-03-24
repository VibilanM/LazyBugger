const express = require("express");

const router = express.Router();

const { getAllChallenges, postChallenge } = require("../controllers/challengeControllers")

router.get("/", getAllChallenges);
router.post("/", postChallenge);

module.exports = router;