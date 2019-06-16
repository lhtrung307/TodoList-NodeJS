const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const TaskSchema = new Schema({
  personID: {
    type: Schema.Types.ObjectId,
    ref: "person",
    required: "Task must have person id"
  },
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

const TaskModel = Mongoose.model("task", TaskSchema);

const listByPersonID = (personID) =>
  TaskModel.find({ personID })
    .then((tasks) => tasks)
    .catch((error) => {
      return { error };
    });
const save = (task) =>
  TaskModel.create(task)
    .then((task) => task)
    .catch((error) => {
      return { error };
    });
const updateByID = (id, updateData) =>
  TaskModel.findByIdAndUpdate(id, updateData, { new: true })
    .then((updatedTask) => updatedTask)
    .catch((error) => {
      return { error };
    });
const deleteByID = (id) =>
  TaskModel.findByIdAndDelete(id)
    .then((task) => task)
    .catch((error) => {
      return { error };
    });

module.exports = {
  TaskModel,
  TaskSchema,
  listByPersonID,
  save,
  updateByID,
  deleteByID
};
