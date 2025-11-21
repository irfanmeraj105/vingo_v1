const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");

// user signup
const userSignup = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role, address } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !mobile || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (mobile.length < 11) {
      return res
        .status(400)
        .json({ message: "Phone number must be 11 digits" });
    }

    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role: role.toLowerCase(), // ensure lowercase
      address,
    });

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res
      .status(200)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal server error in signup" });
  }
};

// user sign in
const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = await generateToken(findUser._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res
      .status(200)
      .json({ message: "User signed in successfully", findUser });
  } catch (error) {
    console.error("SignIn Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in sign in" });
  }
};

// signout
const userSignOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    console.error("SignOut Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error during sign out" });
  }
};

module.exports = {
  userSignup,
  userSignIn,
  userSignOut,
};
