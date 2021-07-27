const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const authrouter = require('./routers/auth')
// Mongodb Connection
// add DB_CONNECT_CONNECTION_STRING and TOKEN_SECRET in .env file
mongoose.connect(
  process.env.DB_CONNECT_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);
app.use(express.json())
app.use('/api/user',authrouter);

app.listen(3000, () => console.log("3000 port server running"));
