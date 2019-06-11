const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: "Todo must have a name",
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});

module.exports = Mongoose.model("todo", TodoSchema);
