// const app = require("express")();
// const PORT = 8080;
// ^ Didnt use middleware

const express = require("express"); //import express
const app = express();
const PORT = 8080;

app.use(express.json()); //Middleware will convery 'body' to json

app.listen(PORT, () => console.log(`It is alive on http://localhost:${PORT}`));

app.get("/tshirt", (req, res) => {
  res.status(200).send({
    tshirt: "blueshirt",
    size: "large",
  });
});

app.post("/tshirt/:id", (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: "Wee need a logo!" });
  }

  res.send({
    tshirt: `${id} with your ${logo}`,
  });
});

// Request:POST
// http://localhost:8080/tshirt/23
// body:
// {
//     "logo": "fire"
// }
// Response:
// Status: 200 OK
// {
//     "tshirt": "23 with your fire"
// }

// Request:POST
// http://localhost:8080/tshirt/23
// body:
// {
//     "logo": ""
// }
// Response:
// Status: 418 I'm a Teapot
// {
//     "message": "Wee need a logo!"
// }
