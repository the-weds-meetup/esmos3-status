const express = require("express");
const getAllEmail = require("./src/getAllEmail");
const addEmail = require("./src/addEmail");
const deleteEmail = require("./src/deleteEmail");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/email", getAllEmail);

app.post("/email/:email", addEmail);

app.delete("/email/:email", deleteEmail);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
