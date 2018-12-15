require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth/auth");
const uploadRouter = require("./routes/upload/upload");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("youhou");
});

app.use("/auth", authRouter);

app.use("", uploadRouter);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

let server = app.listen(process.env.PORT || 5000, function() {
  console.log("Listening on port " + server.address().port);
});
