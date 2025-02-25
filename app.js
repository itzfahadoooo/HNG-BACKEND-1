require("dotenv").config();
const express = require("express");
const cors = require("cors");
const classifyRoute = require("./src/routes/classify");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", classifyRoute);

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
});