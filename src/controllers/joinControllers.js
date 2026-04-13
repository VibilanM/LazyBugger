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

const leaveChallenge = async (req, res) => {
    const challenge_id = req.params.id;

    const { data, error } = await client
        .from('participations')
        .delete()
        .eq("user_id", req.user.id)
        .eq("challenge_id", challenge_id)
        .select();

    if (error) {
        return res.status(400).send({ error });
    }

    res.send({ message: "Left challenge successfully" });
}

export { joinChallenge, leaveChallenge };