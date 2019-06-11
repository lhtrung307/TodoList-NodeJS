const Todos = require("./todo");
class TodoServices {
  async getAllTodos() {
    return Todos.find({});
  }

  async createTodo(todo) {
    let todos = new Todos(todo);
    let result = await todos.save();
    return result;
  }

  async updateTodoByID(id, updateInfo) {
    let todos = Todos.findByIdAndUpdate(id, updateInfo, { new: true });
    return todos;
  }

  async deleteTodoByID(id) {
    let todos = Todos.findByIdAndDelete(id);
    return todos;
  }
}
module.exports = new TodoServices();
