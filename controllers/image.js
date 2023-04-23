const Clarifai = require("clarifai");
require("dotenv").config();

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

const handleAPICall = (req, res) => {
  app.models
    .predict("face-detection", req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with API"));
};

const handlePutImage = (req, res, knex) => {
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
};

module.exports = { handlePutImage, handleAPICall };
