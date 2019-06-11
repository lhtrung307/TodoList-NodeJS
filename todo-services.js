const Todos = require("./todo");

module.exports.getAllTodos = async () => {
  return Todos.find({});
};

module.exports.createTodo = async (todo) => {
  let todos = new Todos(todo);
  let result = await todos.save();
  return result;
};

module.exports.updateTodoByID = async (id, updateInfo) => {
  let todos = Todos.findByIdAndUpdate(id, updateInfo, { new: true });
  return todos;
};

module.exports.deleteTodoByID = async (id) => {
  let todos = Todos.findByIdAndDelete(id);
  return todos;
};
