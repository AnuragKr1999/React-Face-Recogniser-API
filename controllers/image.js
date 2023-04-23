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

module.exports = { handlePutImage };
