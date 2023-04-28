const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const { handleRegister } = require("./controllers/register");
const { handleSignin } = require("./controllers/signin");
const { handleGetProfile } = require("./controllers/profile");
const { handlePutImage, handleAPICall } = require("./controllers/image");
require("dotenv").config();

// destructuring the environment variables
const {DATABASE_URL, DATABASE_PORT, DATABASE_USER,DATABASE_PASSWORD, DATABASE_NAME, SERVER_PORT} = process.env

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: DATABASE_URL,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  },
});

const app = express();
app.use(express.json()); 
app.use(cors());

app.post("/signin", (req, res) => handleSignin(req, res, knex, bcrypt));

app.post("/register", (req, res) => handleRegister(req, res, knex, bcrypt));

app.get("/profile/:id", (req, res) => handleGetProfile(req, res, knex));

app.put("/image", (req, res) => handlePutImage(req, res, knex));

app.post("/imageurl", (req, res) => handleAPICall(req, res));


const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => {
  console.log(`Connected to Face-Recogniser-API. \nListening to port ${PORT}`)
  if (err) console.log(err);
});
