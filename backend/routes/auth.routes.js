const express = require("express");
const {
  userSignup,
  userSignIn,
  userSignOut,
} = require("../controllers/auth.controllers");

const router = express.Router();

// creating the auth routers

router.post("/register", userSignup);
router.post("/signin", userSignIn);
router.get("/signout", userSignOut);

// export the routes

module.exports = router;
