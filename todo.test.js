const { init } = require("./server");
const TodoServices = require("./todo-services");

let url = "/todos";

jest.setTimeout(100000);

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
      const injectOptions = {
        method: "GET",
        url
      };
      const returnValue = [
        { name: "Todo 1", description: "This is todo 1" },
        { name: "Todo 2", description: "This is todo 2" },
        { name: "Todo 3", description: "This is todo 3" }
      ];
      const mockGetAllTodos = jest.fn().mockReturnValue(returnValue);
      TodoServices.getAllTodos = mockGetAllTodos;
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
    });
  });
});
