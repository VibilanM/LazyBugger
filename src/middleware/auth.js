import { client, adminClient } from "../database/supabase.js";

const signUp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: "Email and password required." });
    }

    const { data, error } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true
    });

    if (error) {
        return res.status(400).send({ error });
    }

    res.send({
        message: "User created successfully.",
        user: data.user
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: "Email and password required." });
    }

    const { data, error } = await client.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return res.status(400).send({ error: error.message });
    }

    res.send({
        message: "User logged in successfully.",
        access_token: data.session.access_token,
        user: data.user,
    });
}

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
        res.status(500).send({ error: "Auth middleware failed" })
    }
}

export { signUp, login, authMiddleware };