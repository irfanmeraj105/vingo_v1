const express = require("express");
const { userSignup } = require("../controllers/auth.controllers");

const router = express.Router();

// creating the auth routers

router.post("/register", userSignup);

// export the routes

module.exports = router;
