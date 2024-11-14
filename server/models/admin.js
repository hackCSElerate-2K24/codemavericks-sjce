const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  college: {
    type: String,
    required: [true, "College name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location", // Reference to the Location model
    required: [true, "Location is required"],
  },
});

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Only hash if the password has changed
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
