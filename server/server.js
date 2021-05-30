const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const bodyParser = require("body-parser");

// CORS and body-parser
app.use(cors());
app.use(bodyParser.json());

// options for db
let options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Error checking for ACAO
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes import and Routes usage
const userRoutes = require("./app/routers/user.router");
const tobuyRoutes = require("./app/routers/tobuyitem.router");
const instockRoutes = require("./app/routers/instockitem.router");
app.use("/", userRoutes, tobuyRoutes, instockRoutes);

app.get("/", (req, res) => {
  res.send("ok");
});
// Connecting to DB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x3hwc.mongodb.net/eainthone?retryWrites=true&w=majority`,
    options
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server up and running at ${PORT}`))
  )
  .catch((err) => console.log(err));
