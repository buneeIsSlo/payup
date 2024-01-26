require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;
mongoose.connect(MONGO_URL)
    .then((res) => {
        app.listen(PORT, () => console.log(`Server up and running on port:${PORT}`));
    })
    .catch((err) => {
        console.log("Oops, something went wrong.", err);
    });

app.get("/", (req, res) => {
    res.send("Hello world");
});
