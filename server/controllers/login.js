const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const Driver = require("../models/driver");
const Parent = require("../models/parent");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = async (req, res) => {
  const { role, email, password } = req.body;

  try {
    let user;
    switch (role) {
      case "Admin":
        user = await Admin.findOne({ email });
        break;

      case "Parent":
        user = await Parent.findOne({ email });
        break;

      case "Driver":
        user = await Driver.findOne({ email });
        break;

      default:
        return res.status(400).json({ message: "Invalid role specified" });
    }

    // Check if user exists and if the password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id, role);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      return res
        .status(200)
        .json({ message: `${role} authenticated`, role, user });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
