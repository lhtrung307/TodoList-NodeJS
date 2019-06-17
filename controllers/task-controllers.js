const TaskServices = require("../services/task-services");

class TaskControllers {
  async getListTasks(request, h) {
    let personID = request.auth.credentials.id;
    let query = request.query;
    let sortType;
    if (query.sort && (query.sort === 1 || query.sort === -1)) {
      sortType = query.sort;
    }
    if (!personID) {
      throw new Error("Cannot get personID");
    }
    try {
      let tasks = await TaskServices.listTasks(personID, sortType);
      if (tasks) {
        return h.response(tasks).code(200);
      } else {
        return h.response({ message: "You don't have any task." });
      }
    } catch (error) {
      return h.response(error).code(500);
    }
  }

  async createTask(request, h) {
    let personID = request.auth.credentials.id;
    if (!personID) {
      throw new Error("Cannot get personID");
    }
    let taskData = {
      personID,
      name: request.payload.name,
      description: request.payload.description
    };
    try {
      let task = await TaskServices.createTask(taskData);
      return h.response(task).code(200);
    } catch (error) {
      return h.response(error);
    }
  }

  async updateTask(request, h) {
    let taskID = request.params.id;
    let personID = request.auth.credentials.id;
    if (!personID) {
      throw new Error("Cannot get personID");
    }
    let taskData = {
      personID,
      name: request.payload.name,
      description: request.payload.description
    };
    try {
      let task = await TaskServices.updateTask(taskID, taskData);
      if (task) {
        return h.response(task).code(200);
      } else {
        return h
          .response({
            message: "Not Found"
          })
          .code(404);
      }
    } catch (error) {
      return h.response(error).code(500);
    }
  }

  // TODO: Should I pass the personID to the service to check if that task of this person or not?
  async deleteTask(request, h) {
    let taskID = request.params.id;
    try {
      let task = await TaskServices.deleteTask(taskID);
      return h.response(task).code(200);
    } catch (error) {
      return h.response(error).code(500);
    }
  }
}
module.exports = new TaskControllers();
