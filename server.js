const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./db");
const bodyparser = require("body-parser");
app.use(bodyparser.json());

const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");

app.get("/", (req, res) => {
  console.log("Simple endpoint");
  res.send("Simple endpoint this response given by server");
});

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
