const Todos = require("./todo");

class TodoServices {
  async listTodos(request, h) {
    try {
      let todos = await Todos.list();
      return h.response(todos).code(200);
    } catch (error) {
      return h.response(error).code(500);
    }
  }

  async createTodo(request, h) {
    try {
      let todo = await Todos.save(request.payload);
      return h.response(todo).code(200);
    } catch (error) {
      console.log(error);
      return h.response(error.errors.name.message);
    }
  }

  async updateTodo(request, h) {
    try {
      if (request.payloay) {
        let todoID = request.params.id;
        let todos = await Todos.updateByID(todoID, request.payload);
        return h.response(todos).code(200);
      } else {
        return h.response({ message: "Body required" });
      }
    } catch (error) {
      return h.response(error).code(500);
    }
  }

  async deleteTodo(request, h) {
    try {
      let todoID = request.params.id;
      let todos = await Todos.deleteByID(todoID);
      return h.response(todos).code(200);
    } catch (error) {
      return h.response(error).code(500);
    }
  }
}
module.exports = new TodoServices();
