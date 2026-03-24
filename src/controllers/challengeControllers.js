import client from "../db/supabase.js"

const getAllChallenges = async (req, res) => {
    const { data, error } = await client
        .from('challenges')
        .select('*');
    res.send(data);
}

const postChallenge = (req, res) => {
    res.send({ message: "Challenge Created." });
}

export { getAllChallenges, postChallenge };