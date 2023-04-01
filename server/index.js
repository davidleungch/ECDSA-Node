const express = require("express");
const app = express();
const cors = require("cors");
const { SignatureToAddress } = require("./scripts/crypto");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04c10972a8f95a60c12309dd87c94268df11f4c98454ed708df0a534942b6d399867459ff5b4349c346d3c8a31f6ae135e55389f342aa41234b3ab0c93196806c5": 100,
  "04bebf0913bf7721a9caf7b6f9396782427b93ff7e5bd87086b9a0b24181bba641ada73a6cb9e13fc1877fe425e58181c7407c4158e5aa1e4a3ae303fd84878ae8": 50,
  "04e1941dc4dd3633f30a5ae82c6d8348637f56fec871e631c95b58695c76d931e6941c4020e44f60abd934e23dcbbd27df86977cd4d75691ecd2ea88e9788300fb": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public key address from the signature

  const { message, signature } = req.body;
  console.log(signature);
  const { recipient, amount } = message;

  const sender = SignatureToAddress(message, signature);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
