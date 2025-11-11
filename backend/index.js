const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connection
connectDB();

// routes
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
