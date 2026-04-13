import client from "../database/supabase.js"

const getAllChallenges = async (req, res) => {
    const { data, error } = await client
        .from('challenges')
        .select('*');
    res.send(data);
}

const getChallengeById = async (req, res) => {
    const id = req.params.id;
    const { data, error } = await client
        .from('challenges')
        .select('*')
        .eq('id', id);
    res.send(data);
}

const postChallenge = async (req, res) => {

    const { title, description, is_public, deadline } = req.body;

    const { data, error } = await client
        .from('challenges')
        .insert({
            title: title,
            description: description,
            creator_id: "40abf6df-0204-47bc-a50e-d0d34e1eb3bf",
            is_public: is_public,
            deadline: deadline
        })
        .select();
    res.send({ message: "Challenge Created." });
}

const getParticipants = async (req, res) => {
    const challenge_id = req.params.id;

    const { data, error } = await client
        .from('participations')
        .select('*')
        .eq("challenge_id", challenge_id);

    if (error) {
        return res.status(400).send({ error });
    }

    res.send(data);
}

export { getAllChallenges, getChallengeById, postChallenge, getParticipants };