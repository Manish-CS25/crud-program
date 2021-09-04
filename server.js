const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/db.js");
const mongoose = require("mongoose");
const noteRoute = require("./routes/noteRoute.js");
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now ...", err);
    process.exit();
  });

//create express app
const app = express();

//parse request of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json

app.use(express.json());

app.use("/", noteRoute);

//define a simple route

app.get("/", (req, res) => {
  res.json({ message: "This is simple request from server " });
});

//listen for request
app.listen(5000, () => {
  console.log(`Server is listen on port ${5000}`);
});
