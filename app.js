const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes/routes");

const app = express();

if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/drivers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
