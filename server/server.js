const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const bodyParser = require("body-parser");

const PORT = 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
