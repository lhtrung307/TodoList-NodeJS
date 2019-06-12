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

const TodoModel = Mongoose.model("todo", TodoSchema);

const list = () => TodoModel.find();
const save = (todo) => TodoModel.create(todo);
const updateByID = (id, updateData) =>
  TodoModel.findByIdAndUpdate(id, updateData, { new: true });
const deleteByID = (id) => Todos.findByIdAndDelete(id);

module.exports = {
  TodoModel,
  TodoSchema,
  list,
  save,
  updateByID,
  deleteByID
};
