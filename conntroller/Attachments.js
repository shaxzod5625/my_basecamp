const projectModel = require('../models/Project')
const attachmentModel = require('../models/File')

class Attachments {
  async getAll(req, res) {
    try {
      const { id } = req.params
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const attensions = await attachmentModel.find({ project_id: id })
      return res.status(200).json(attensions)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async create(req, res) {
    try {
      const { id } = req.params
      const { file, name } = req.body
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const attension = await attachmentModel.create({
        file: file,
        project_id: id,
        name: name
      })
      return res.status(200).json({ message: 'Attachment created', file: attension })
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async delete(req, res) {
    try {
      const { id, attachment_id } = req.params
      console.log(id, attachment_id);
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const attachment = await attachmentModel.findById(attachment_id)
      if (!attachment) {
        return res.status(404).json({ message: 'Attachment not found' })
      }
      await attachment.remove()
      return res.status(200).json({ message: 'Attachment deleted' })
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
}

module.exports = new Attachments()