const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
  },
  lastName: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    unique: true,
    required: true,

  },
  password: {
    type: String,
    required: true,

  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10); // Reduced the salt rounds to 10 for better performance
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;
    next();
  } catch (err) {
    throw new Error("Error while hashing password");
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10); // Reduced the salt rounds to 10 for better performance
      const hashed = await bcrypt.hash(update.password, salt);
      update.password = hashed;
    } catch (err) {
      throw new Error("Error while hashing password");
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;