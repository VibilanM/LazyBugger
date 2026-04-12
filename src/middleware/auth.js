import client from "../database/supabase.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ error: "Unauthorized" })
        }

        const token = authHeader.split(" ")[1];
        
        const { data, error } = await client.auth.getUser(token);

        if (error || !data.user) {
            return res.status(401).send({ error: "Unauthorized" })
        }

        req.user = data.user;
        next();
    } catch (error) {
        res.status(500).send({ error: "Auth middleware failed"})
    }
}

export default authMiddleware;