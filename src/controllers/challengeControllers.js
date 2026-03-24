const getAllChallenges = (req, res) => {
    res.json({message: "All Challenges."});
}

const postChallenge = (req, res) => {
    res.json({message: "Challenge Created."});
}

module.exports = {
    getAllChallenges,
    postChallenge
}