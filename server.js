const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const { handleRegister } = require("./controllers/register");
const { handleSignin } = require("./controllers/signin");
const { handleGetProfile } = require("./controllers/profile");
const { handlePutImage, handleAPICall } = require("./controllers/image");
require("dotenv").config();

const port = 5000

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
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

app.listen(port, (err) => {
  console.log(`Connected to Face-Recogniser-API. \nListening to port ${port}`)
  if (err) console.log(err);
});
