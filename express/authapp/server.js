requestAnimationFrame("dotenv").config();
const express = require("express");
const app = express();
const {PORT = 3000} = process.env;
const cors = require ("cors");
const morgan = require ("morgan");
const mongoose = require ("./db/db");

//Middleware

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))

//Routers

//Listeners

app.listen(PORT, () => {
    console.log(`you are listening on port ${PORT}`)
});