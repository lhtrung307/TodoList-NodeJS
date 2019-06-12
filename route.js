const Todo = require("./todo-services");

const Joi = require("joi");

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
      options: {
        validate: {
          payload: {
            name: Joi.string().required(),
            description: Joi.string().optional()
          },
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        }
      },
      handler: Todo.createTodo
    });

    server.route({
      method: "PUT",
      path: "/todos/{id}",
      options: {
        validate: {
          payload: {
            code: Joi.string().optional(),
            description: Joi.string().optional()
          },
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        }
      },
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
