const Tasks = require("../models/task");
const Joi = require("@hapi/joi");

class TaskServices {
  async listTasks(personID, sortType) {
    if (!personID || typeof personID !== "string") {
      throw new Error("Person id cannot be empty");
    }
    let sort;
    if (!sortType) {
      sort = {};
    } else {
      sort = { name: sortType };
    }
    let tasks = await Tasks.listByPersonID(personID, sort);
    if (tasks.error) {
      throw tasks.error;
    }
    return tasks;
  }

  async createTask(task) {
    if (!task) {
      throw new Error("Task cannot be empty");
    }
    let result = await this.validateTask(task);
    if (result.error) {
      throw result.error;
    }
    let savedTask = await Tasks.save(task);
    if (savedTask.error) {
      throw savedTask.error;
    }
    return savedTask;
  }

  async updateTask(taskID, updateData) {
    if (!taskID || typeof taskID !== "string") {
      throw new Error("Task id cannot be empty");
    }
    if (
      !updateData ||
      (Object.keys(updateData).length === 0 &&
        updateData.constructor === Object)
    ) {
      throw new Error("Update data cannot be empty");
    }
    if (
      updateData.personID !== "" &&
      typeof updateData.personID !== "undefined"
    ) {
      throw new Error("Cannot update person id");
    }
    let result = await this.validateUpdateTask(updateData);
    if (result.error) {
      throw result.error;
    }

    let updatedTask = await Tasks.updateByID(taskID, updateData);
    if (updatedTask.error) {
      return updatedTask.error;
    }
    return updatedTask;
  }

  async deleteTask(taskID) {
    if (!taskID || typeof taskID !== "string") {
      throw new Error("Task id cannot be empty");
    }
    let task = await Tasks.deleteByID(taskID);
    if (task.error) {
      throw task.error;
    }
    return { message: "Task deleted" };
  }

  taskValidate() {
    return Joi.object().keys({
      personID: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().optional()
    });
  }

  validateTask(task) {
    return Joi.validate(task, this.taskValidate());
  }

  updateTaskValidate() {
    return Joi.object().keys({
      name: Joi.string().optional(),
      description: Joi.string().optional()
    });
  }

  validateUpdateTask(updateData) {
    return Joi.validate(updateData, this.updateTaskValidate());
  }
}

module.exports = new TaskServices();
