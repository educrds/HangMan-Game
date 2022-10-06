//jshint esversion:6

const express = require("express");
// const bodyParser = require("body-parser");

const app = express();
// app.set("view engine", "ejs");

app.use(express.static("public"));

// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/start-game", function (req, res) {
  res.sendFile(__dirname + "/game.html");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
