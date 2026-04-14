import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import challengeRoutes from "./routes/challengeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

app.use("/challenges", challengeRoutes)
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/test", (req, res) => {
    res.json({ message: "What?" });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});