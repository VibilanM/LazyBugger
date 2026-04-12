import client from "../database/supabase.js";

const joinChallenge = async (req, res) => {
    const challenge_id = req.params.id;

    const { data, error } = await client
        .from('participations')
        .insert({
            user_id: req.user.id,
            challenge_id: challenge_id,
            status: "active"
        })
        .select();

    if (error) {
        return res.status(400).send({ error });
    }

    res.send(data);
};

export { joinChallenge };