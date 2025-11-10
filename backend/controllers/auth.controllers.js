const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");

// user signup

const userSignup = async (req, res) => {
  try {
    const { fullName, email, password, phone, role } = req.body;

    // check if user is already registered in database

    const findUser = await userModel.findOne({ email });

    if (findUser) {
      return res
        .status(400)
        .json({ message: "user already existed in the database" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be more than 6 characters" });
    }

    if (phone.length < 11) {
      return res
        .status(400)
        .json({ message: "phone number must be of the 11 characters" });
    }

    // now hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // now create the new user in the db
    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role,
    });
    // creating the token
    const token = await generateToken(user._id);

    // send token into cookies
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res
      .status(200)
      .json({ message: "user registered successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error in signup" });
  }
};

module.exports = {
  userSignup,
};
