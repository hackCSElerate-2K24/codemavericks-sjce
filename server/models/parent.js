const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Parent name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location", // Reference to the Location model
    required: [true, "Location is required"],
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to the Location model
      required: [true, "Parent must atleast have a child"],
    },
  ],
});

parentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Only hash if the password has changed
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Parent", parentSchema);
