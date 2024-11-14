const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
const Driver = require("./models/Driver");
const Parent = require("./models/Parent");

const JWT_SECRET = "your_secret_key"; // Replace with a strong secret key

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "1d" });
};

const login = async (req, res) => {
  const { role, email, password, studentId, busId } = req.body;

  try {
    let user;
    switch (role) {
      case "Admin":
        user = await Admin.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user._id, role);
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res
            .status(200)
            .json({ message: "Admin authenticated", role, user });
        }
        break;

      case "Parent":
        user = await Parent.findOne({ email, children: studentId });
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user._id, role);
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res
            .status(200)
            .json({ message: "Parent authenticated", role, user });
        }
        break;

      case "Driver":
        user = await Driver.findOne({ email, assignedBus: busId });
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user._id, role);
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res
            .status(200)
            .json({ message: "Driver authenticated", role, user });
        }
        break;

      default:
        return res.status(400).json({ message: "Invalid role specified" });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
