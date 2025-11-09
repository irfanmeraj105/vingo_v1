const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// db connection
connectDB();

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
