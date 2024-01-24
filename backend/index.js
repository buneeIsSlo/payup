require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();


const MONGO_URL = process.env.MONGO_URL;
const PORT = 8080;
mongoose.connect(MONGO_URL)
    .then((res) => {
        app.listen(PORT, () => console.log("Server up and running!"));
    })
    .catch((err) => {
        console.log("Oops, something went wrong.", err);
    });

app.get("/", (req, res) => {
    res.send("Hello world");
});
