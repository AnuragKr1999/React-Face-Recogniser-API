const handleRegister = (req, res, knex, bcrypt) => {
  const { email, name, password } = req.body;
  if(!email || !name || !password) {
    return res.status(400).json('Invalid Credentials')
  }
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
    .catch((err) => {
      console.log(err.message)
      res.status(400).json("Unable to Register");
    })
};


module.exports = {
    handleRegister: handleRegister
}