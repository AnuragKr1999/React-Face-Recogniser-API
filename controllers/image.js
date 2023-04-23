require("dotenv").config();
const Clarifai = require("clarifai");
// const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

// const stub = ClarifaiStub.grpc();

// const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key YOUR_CLARIFAI_API_KEY");

// You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

// =========== Using Clarifai API JavaScript Client ===========================
const handleAPICall = (req, res) => {
  app.models
    .predict("face-detection", req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with API"));
};

// ============= Using Clarifai Node.js gRPC Client ============================
// const handleAPICall = (req, res) => {
//   stub.PostModelOutputs(
//     {
//       model_id: "face-detection", // face-detect model
//       inputs: [{ data: { image: { url: req.body.input } } }],
//     },
//     metadata,
//     (err, response) => {
//       if (err) {
//         console.log("Error: " + err);
//         return;
//       }

//       if (response.status.code !== 10000) {
//         console.log(
//           "Received failed status: " +
//             response.status.description +
//             "\n" +
//             response.status.details
//         );
//         return;
//       }

//       console.log("Predicted concepts, with confidence values:");
//       for (const c of response.outputs[0].data.concepts) {
//         console.log(c.name + ": " + c.value);
//       }
//       res.json(response);
//     }
//   );
// };

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
