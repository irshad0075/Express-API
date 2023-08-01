const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
    },
     role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
module.exports = User;
