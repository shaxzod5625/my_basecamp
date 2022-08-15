const taskModel = require('../models/Task');

class Task {
  async getAll(req, res) {
    try {
      const { id } = req.params
      const tasks = await taskModel.find({
        user: req.user.userId,
        project: id
      })
      return res.status(200).json(tasks);
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async getOne(req, res) {
    try {
      const { id, task_id } = req.params;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const task = await taskModel.findById(task_id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json(task);
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async create(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      console.log(title, id);
      const task = taskModel.create({
        title,
        project_id: id,
        compleated: false
      });
      return res.status(201).json(task);
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async delete(req, res) {
    try {
      const { id, task_id } = req.params;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const task = await taskModel.findByIdAndDelete(task_id);
      return res.status(200).json('Task deleted successfully');
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async update(req, res) {
    try {
      const { id, task_id } = req.params;
      const { title, compleated } = req.body;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const task = await taskModel.findById(task_id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      task.title = title;
      task.compleated = compleated;
      await task.save();
      return res.status(200).json('Task updated successfully');
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
}

module.exports = new Task();