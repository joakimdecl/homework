"use strict";

const app = require("express")();
const config = require("./config.js");
const routes = require("./routes")(config);
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(routes);

app.get("/hello", [ (req, res) => {
  console.info("Grapje :-)");

  res.json({ what: "hello" });
} ]);

const server = app.listen(config.port, () => {
  console.info(`Listening to port ${server.address().port}`);
});
