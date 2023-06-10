const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: {type: String},
    email: { type: String },
    password: {type: String},
    profile_image: {type : String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);