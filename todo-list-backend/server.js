var express = require("express");
var cors = require("cors");
const Task = require("./models/taskModel");
const User = require("./models/userModel");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const port = process.env.PORT || 3000;

var app = express();
app.use(express.json());
app.use(cors());
app.use("/users", require("./routes/userRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));
app.use(require("./routes/testRoutes"));
app.use(errorHandler);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Node API is running on port " + port);
    });
  })
  .catch((error) => {
    console.log("Cannot connect to MongoDB");
    console.log(error);
  });
