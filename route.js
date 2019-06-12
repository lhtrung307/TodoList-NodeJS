const Todo = require("./todo-services");

const Router = {
  name: "todo-list-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/todos",
      handler: Todo.listTodos
    });

    server.route({
      method: "POST",
      path: "/todos",
      handler: Todo.createTodo
    });

    server.route({
      method: "PUT",
      path: "/todos/{id}",
      handler: Todo.updateTodo
    });

    server.route({
      method: "DELETE",
      path: "/todos/{id}",
      handler: Todo.deleteTodo
    });
  }
};

module.exports = Router;
