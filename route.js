const Todo = require("./todo-controllers");

const Router = {
  name: "todo-list-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/todos",
      handler: Todo.list
    });

    server.route({
      method: "POST",
      path: "/todos",
      handler: Todo.create
    });

    server.route({
      method: "PUT",
      path: "/todos/{id}",
      handler: Todo.update
    });

    server.route({
      method: "DELETE",
      path: "/todos/{id}",
      handler: Todo.delete
    });
  }
};

module.exports = Router;
