const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "User must have username"
  },
  password: {
    type: String,
    required: "User must have password"
  },
  name: {
    type: String,
    trim: true,
    required: "User must have name"
  }
});

const UserModel = Mongoose.model("user", UserSchema);

const getUserByUsername = (username) => UserModel.findOne({ username });
const save = (user) => UserModel.create(user);

module.exports = {
  UserSchema,
  UserModel,
  getUserByUsername,
  save
};
