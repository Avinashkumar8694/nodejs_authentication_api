const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

// Mongodb Connection
// add DB_CONNECT_CONNECTION_STRING and TOKEN_SECRET in .env file
mongoose.connect(
  process.env.DB_CONNECT_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);

app.listen(3000, () => console.log("3000 port server running"));
