const taskModel = require('../models/Task');

class Task {
  async getAll(req, res) {
    try {
      const tasks = await taskModel.find({
        user: req.user.userId,
        project: req.params.id
      })
      return res.status(200).json(tasks);
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async getOne(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const task = await taskModel.findById(id);
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
      const { title, project_id } = req.body;
      const task = new taskModel({
        title,
        project: project_id,
        user: req.user.userId
      });
      await task.save();
      return res.status(201).json('Task created successfully');
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const task = await taskModel.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json('Task deleted successfully');
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async update(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: "Please provide a valid id" });
      }
      const task = await taskModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json('Task updated successfully');
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
}

module.exports = new Task();