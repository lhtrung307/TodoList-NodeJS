const Tasks = require("../models/task");
const TaskServices = require("./task-services");

describe("Test task services", () => {
  describe("Test listTasks method", () => {
    it("Should throw error when personID is null", async () => {
      expect(TaskServices.listTasks(null)).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error when personID is {}", async () => {
      expect(TaskServices.listTasks({})).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error when personID is undefined", async () => {
      expect(TaskServices.listTasks()).rejects.toThrowError(/cannot be empty/);
    });

    it("Should throw error when can't get list tasks", async () => {
      Tasks.listByPersonID = jest
        .fn()
        .mockRejectedValue(new Error("Can't get list tasks"));
      expect(TaskServices.listTasks("1")).rejects.toThrowError(/list tasks/);
    });

    it("Should return list tasks", async () => {
      let returnValue = [
        {
          personID: "1",
          name: "Task 1",
          description: "This is description 1"
        },
        {
          personID: "1",
          name: "Task 2",
          description: "This is description 2"
        }
      ];
      Tasks.listByPersonID = jest.fn().mockReturnValue(returnValue);
      expect(TaskServices.listTasks("1")).resolves.toHaveLength(2);
      expect(TaskServices.listTasks("1")).resolves.toEqual(returnValue);
    });
  });

  describe("Test createTask method", () => {
    it("Should throw error if task is undefined", async () => {
      expect(TaskServices.createTask()).rejects.toThrowError(/cannot be empty/);
    });

    it("Should throw error if task is null", async () => {
      expect(TaskServices.createTask(null)).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error if task is {}", async () => {
      expect(TaskServices.createTask({})).rejects.toThrowError(/personID/);
    });

    it("Should throw error if task is missing personID field", async () => {
      let task = {
        personID: "",
        name: "Hello",
        description: "This is description"
      };
      TaskServices.validateTask = jest
        .fn()
        .mockRejectedValue(new Error("personID"));
      expect(TaskServices.createTask(task)).rejects.toThrowError(/personID/);
    });

    it("Should throw error if task is missing name field", async () => {
      let task = {
        personID: "1",
        name: "",
        description: "This is description"
      };
      TaskServices.validateTask = jest
        .fn()
        .mockRejectedValue(new Error("name"));
      expect(TaskServices.createTask(task)).rejects.toThrowError(/name/);
    });

    it("Should throw error when cannot save task", async () => {
      let task = {
        personID: "1",
        name: "Hello",
        description: "This is description"
      };
      TaskServices.validateTask = jest.fn().mockResolvedValue({});
      Tasks.save = jest.fn().mockRejectedValue(new Error("cannot save"));
      expect(TaskServices.createTask(task)).rejects.toThrowError(/cannot save/);
    });

    it("Should return created task", async () => {
      let task = {
        personID: "1",
        name: "Hello",
        description: "This is description"
      };
      TaskServices.validateTask = jest.fn().mockResolvedValue({});
      Tasks.save = jest.fn().mockResolvedValue(task);
      expect(TaskServices.createTask(task)).resolves.toHaveProperty(
        "personID",
        "1"
      );
    });
  });

  describe("Test updateTask method", () => {
    it("Should throw error if taskID is undefined", async () => {
      expect(TaskServices.updateTask()).rejects.toThrowError(/cannot be empty/);
    });

    it("Should throw error if taskID is null", async () => {
      expect(TaskServices.updateTask(null)).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error if taskID is {}", async () => {
      expect(TaskServices.updateTask({})).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error if updateData is undefined", async () => {
      expect(TaskServices.updateTask("1")).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error if updateData is null", async () => {
      expect(TaskServices.updateTask("1", null)).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error if updateData is {}", async () => {
      expect(TaskServices.updateTask("1", {})).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error if updateData is having personID field", async () => {
      let task = {
        personID: "1",
        name: "Hello",
        description: "This is description"
      };
      let taskID = "1";
      expect(TaskServices.updateTask(taskID, task)).rejects.toThrowError(
        /person id/
      );
    });

    it("Should throw error when cannot update task", async () => {
      let task = {
        name: "Hello",
        description: "This is description"
      };
      let taskID = "1";
      TaskServices.validateUpdateTask = jest.fn().mockResolvedValue({});
      Tasks.updateByID = jest
        .fn()
        .mockRejectedValue(new Error("cannot update"));
      expect(TaskServices.updateTask(taskID, task)).rejects.toThrowError(
        /cannot update/
      );
    });

    it("Should return updated task", async () => {
      let task = {
        name: "Hello",
        description: "This is description"
      };
      let updatedTask = {
        taskID: "1",
        personID: "1",
        name: "Hello",
        description: "This is description"
      };
      TaskServices.validateUpdateTask = jest.fn().mockResolvedValue({});
      Tasks.updateByID = jest.fn().mockResolvedValue(updatedTask);
      expect(
        TaskServices.updateTask(updatedTask.taskID, task)
      ).resolves.toHaveProperty("personID", "1");
      expect(
        TaskServices.updateTask(updatedTask.taskID, task)
      ).resolves.toHaveProperty("taskID", "1");
    });
  });

  describe("Test deleteTask method", () => {
    it("Should throw error if taskID is undefined", async () => {
      expect(TaskServices.deleteTask()).rejects.toThrowError(/cannot be empty/);
    });

    it("Should throw error if taskID is null", async () => {
      expect(TaskServices.deleteTask(null)).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error if taskID is {}", async () => {
      expect(TaskServices.deleteTask({})).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error when cannot delete task", async () => {
      let taskID = "1";
      Tasks.deleteByID = jest
        .fn()
        .mockRejectedValue(new Error("cannot update"));
      expect(TaskServices.deleteTask(taskID)).rejects.toThrowError(
        /cannot update/
      );
    });

    it("Should return message when deleted task", async () => {
      let taskID = "1";
      Tasks.deleteByID = jest.fn().mockResolvedValue({});
      expect(TaskServices.deleteTask(taskID)).resolves.toHaveProperty(
        "message",
        "Task deleted"
      );
    });
  });
});
