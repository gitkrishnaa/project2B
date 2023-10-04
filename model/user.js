const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//schema
const userSchema = mongoose.Schema({
  name: String,
  password: String,
  email: {
    type:String,
    unique:true,
  },
  verified:Boolean,
});

const userModel = mongoose.model("user", userSchema);







module.exports = userModel;
