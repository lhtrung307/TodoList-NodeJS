const { init } = require("./server");
const Todos = require("./todo");

let url = "/todos";

describe("Todos endpoints", () => {
  let server;
  beforeAll(async () => {
    server = await init();
  });

  beforeEach(async () => {
    await server.initialize();
  });

  afterEach(async () => {
    await server.stop();
  });

  describe(`GET ${url}`, () => {
    it("Should get all categories", async () => {
      expect.assertions(1);
      const injectOptions = {
        method: "GET",
        url
      };
      const returnValue = [
        { name: "Todo 1", description: "This is todo 1" },
        { name: "Todo 2", description: "This is todo 2" },
        { name: "Todo 3", description: "This is todo 3" }
      ];
      const mockListTodos = jest.fn().mockReturnValue(returnValue);
      Todos.list = mockListTodos;
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe(`POST ${url}`, () => {
    it("Should return error when field name is missing", async () => {
      // expect.assertions(1);
      const injectOptions = {
        method: "POST",
        url,
        payload: {
          description: "This is todo 1"
        }
      };
      returnValue = new Error("Todo must have a name");
      const mockCreateTodo = jest.fn().mockReturnValue(returnValue);
      Todos.createTodo = mockCreateTodo;
      const response = await server.inject(injectOptions);
      expect(response.payload).toEqual(returnValue.message);
    });
  });

  describe(`PUT ${url}/{id}`, () => {
    it("Should return status code equal 200", async () => {
      let todoID = 1;
      const injectOptions = {
        method: "PUT",
        url: `${url}/${todoID}`,
        payload: {
          description: "This is todo 1"
        }
      };
      returnValue = {
        _id: todoID,
        name: "Todo 1",
        description: "This is todo 1"
      };
      const mockUpdateByID = jest.fn().mockReturnValue(returnValue);
      Todos.updateByID = mockUpdateByID;
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
    });

    it("Should return updated todo", async () => {
      let todoID = 1;
      const injectOptions = {
        method: "PUT",
        url: `${url}/${todoID}`,
        payload: {
          description: "This is todo 1"
        }
      };
      returnValue = {
        _id: todoID,
        name: "Todo 1",
        description: "This is todo 1"
      };
      const mockUpdateByID = jest.fn().mockReturnValue(returnValue);
      Todos.updateByID = mockUpdateByID;
      const response = await server.inject(injectOptions);
      expect(JSON.parse(response.payload)).toEqual(returnValue);
    });

    it("Should return status code 404 if id not exist", async () => {
      let todoID = 1;
      const injectOptions = {
        method: "PUT",
        url: `${url}/${todoID}`,
        payload: {
          description: "This is todo 1"
        }
      };
      returnValue = undefined;
      const mockUpdateByID = jest.fn().mockReturnValue(returnValue);
      Todos.updateByID = mockUpdateByID;
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(404);
    });
  });

  describe(`DELETE ${url}/{id}`, () => {
    it("Should return status code equal 200", async () => {
      let todoID = 1;
      const injectOptions = {
        method: "PUT",
        url: `${url}/${todoID}`,
        payload: {
          description: "This is todo 1"
        }
      };
      returnValue = {
        _id: todoID,
        name: "Todo 1",
        description: "This is todo 1"
      };
      const mockUpdateByID = jest.fn().mockReturnValue(returnValue);
      Todos.updateByID = mockUpdateByID;
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
    });
  });
});
