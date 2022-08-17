const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const path = require("path");

const apiRouter = require("./Routes/route.js");
// mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(bodyParser.json());

app.set("view engine", "ejs");

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "DELETE"],

  allowedHeaders: ["Content-Type", "auth-token"],
};

app.use(cors(corsOpts));
app.use("/", apiRouter);

app.listen(PORT, () => {
  console.log("server is running on port 8000");
});
