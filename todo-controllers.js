const {
  getAllTodos,
  createTodo,
  updateTodoByID,
  deleteTodoByID
} = require("./todo-services");

class TodoController {
  async list(request, h) {
    try {
      let todos = await getAllTodos();
      return h.response(todos).code(200);
    } catch (error) {
      return h.response(error).code(500);
    }
  }

  async create(request, h) {
    try {
      let todos = await createTodo(request.payload);
      return h.response(todos).code(200);
    } catch (error) {
      return h.response(error).code(500);
    }
  }

  async update(request, h) {
    try {
      if (request.payloay) {
        let todoID = request.params.id;
        let todos = await updateTodoByID(todoID, request.payload);
        return h.response(todos).code(200);
      } else {
        return h.response({ message: "Body required" });
      }
    } catch (error) {
      return h.response(error).code(500);
    }
  }

  async delete(request, h) {
    try {
      let todoID = request.params.id;
      let todos = await deleteTodoByID(todoID);
      return h.response(todos).code(200);
    } catch (error) {
      return h.response(error).code(500);
    }
  }
}
module.exports = new TodoController();
