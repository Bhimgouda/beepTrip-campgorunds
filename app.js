const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Make API calls Bro");
});

app.listen(7000, () => {
  console.log("LISTENING ON PORT 7000");
});
