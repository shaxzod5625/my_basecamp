const projectModel = require("../models/Project");

class Project {
  async getAll(req, res) {
    try {
      const projects = await projectModel.find({ user: req.user.userId });
      return res.status(200).json(projects);
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
      const project = await projectModel.findById(id);
      if (project.user != req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return res.status(200).json(project);
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async create(req, res) {
    try {
      const { title, description } = req.body;
      const project = new projectModel({
        title,
        description,
        user: req.user.userId,
      });
      await project.save();
      return res.status(201).json({ message: "Project created successfully" });
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
      const project = await projectModel.findById(id);
      if (project.user != req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      await projectModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "Project deleted successfully" });
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
      const project = await projectModel.findById(id);
      if (project.user != req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { title, description } = req.body;
      await projectModel.findByIdAndUpdate(id, { title, description });
      return res.status(200).json({ message: "Project updated successfully" });
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
}

module.exports = new Project();