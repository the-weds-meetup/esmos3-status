const express = require("express");
const getAllEmails = require("./src/getAllEmail");

const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/emails", getAllEmails);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
