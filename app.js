const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.listen(3000, () => console.log('3000 port server running'));