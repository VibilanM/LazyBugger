const express = require("express");

const app = express();

app.use(express.json());

const challengeRoutes = require("./routes/challengeRoutes");

app.use("/challenges", challengeRoutes)

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