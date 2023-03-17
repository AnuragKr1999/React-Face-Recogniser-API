const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
require("dotenv").config();

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

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  knex
    .select("email", "hash")
    .from("login")
    .where("email", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        knex
          .select("*")
          .from("users")
          .where("email", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("Unable to get user"));
      } else {
        res.status(400).json("Wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("Wrong credentials"));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);

  knex
    .transaction((trx) => {
      knex
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .transacting(trx)
        .then(() => {
          knex
            .insert({
              email: email,
              name: name,
              joined: new Date(),
            })
            .into("users")
            .transacting(trx)
            .then((user) => {
              knex
                .select("*")
                .from("users")
                .where("id", user[0])
                .then((data) => res.json(data[0]));
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((err) => res.status(400).json("Unable to Register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  knex
    .select("*")
    .from("users")
    .where("id", id)
    .then((user) => {
      if (user.length) res.json(user[0]);
      else res.status(400).json("User Not Found");
    })
    .catch((err) => res.status(400).json("Error getting user"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  knex("users")
    .where("id", id)
    .increment("entries", 1)
    .then(() => {
      knex
        .select("entries")
        .from("users")
        .where("id", id)
        .then((obj) => res.json(obj[0].entries));
    })
    .catch((err) => res.status(400).json("Unable to get entries"));
});

app.listen(3001, (err) => {
  if (err) console.log(err);
});
