const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const session = require("express-session");

const PORT = 3001;
const app = express();

// Configure express-session middleware
app.use(
  session({
    secret: "mysecretsessionkey",
    resave: false,
    saveUninitialized: true,
    // Add any other session configuration options you need
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong on the server!");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
