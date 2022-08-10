const projectModel = require('../models/Project');
const DiscussionModel = require('../models/Discussion');
const MessageModel = require('../models/Message');
const FileModel = require('../models/File');
const multer = require('multer');

class Discussion {
  async getAll(req, res) {
    try {
      const { id } = req.params
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const discussion = await DiscussionModel.find({ project_id: id })
      return res.status(200).json(discussion)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async getOne(req, res) {
    try {
      const { id, discussion_id } = req.params
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const discussion = await DiscussionModel.findById(discussion_id)
      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' })
      }
      return res.status(200).json(discussion)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async create(req, res) {
    try {
      const { id } = req.params
      const { title, owner } = req.body
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const discussion = await DiscussionModel.create({
        title,
        messages: [],
        owner,
        project_id: id,
      })
      return res.status(201).json(discussion)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async update(req, res) {
    try {
      const { id, discussion_id } = req.params
      const { title, messages } = req.body
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const discussion = await DiscussionModel.findById(discussion_id)
      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' })
      }
      discussion.title = title
      discussion.messages = messages
      await discussion.save()
      return res.status(200).json(discussion)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async delete(req, res) {
    try {
      const { id, discussion_id } = req.params
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      await DiscussionModel.findByIdAndDelete(discussion_id)
      return res.status(200).json({ message: 'Discussion deleted' })
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async addMessage(req, res) {
    try {
      const { id, discussion_id } = req.params
      const { message, user_id } = req.body
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const discussion = await DiscussionModel.findById(discussion_id)
      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' })
      }
      const messageModel = await MessageModel.create({
        message,
        user_id,
        discussion_id,
      })
      discussion.messages.push(messageModel)
      await discussion.save()
      return res.status(200).json(discussion)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async getMessage(req, res) {
    try {
      const { id, discussion_id, message_id } = req.params
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const discussion = await DiscussionModel.findById(discussion_id)
      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' })
      }
      const message = await MessageModel.findById(message_id)
      if (!message) {
        return res.status(404).json({ message: 'Message not found' })
      }
      return res.status(200).json(message)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async updateMessage(req, res) {
    try {
      const { id, discussion_id, message_id } = req.params
      const { messagetext } = req.body
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const discussion = await DiscussionModel.findById(discussion_id)
      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' })
      }
      const message = await MessageModel.findById(message_id)
      if (!message) {
        return res.status(404).json({ message: 'Message not found' })
      }
      message.message = messagetext
      await message.save()
      const index = discussion.messages.findIndex(m => m.id === message_id)
      console.log(index);
      discussion.messages[index] = message
      await discussion.save()
      return res.status(200).json(message)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async deleteMessage(req, res) {
    try {
      const { id, discussion_id, message_id } = req.params
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const discussion = await DiscussionModel.findById(discussion_id)
      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' })
      }
      const message = await MessageModel.findById(message_id)
      if (!message) {
        return res.status(404).json({ message: 'Message not found' })
      }
      await message.remove()
      return res.status(200).json(discussion)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async uploadFile(req, res) {
    try {
      const { id } = req.params
      const { file } = req.files
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const files = await FileModel.create({
        file: file.name,
        project_id,
      })
      await multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './files/')
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname)
        }
      })
      return res.status(200).sendFile(`./files/${files.file}`)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
  async getFile(req, res) {
    try {
      const { id, file_id } = req.params
      const project = await projectModel.findById(id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const file = await FileModel.findById(file_id)
      if (!file) {
        return res.status(404).json({ message: 'File not found' })
      }
      return res.status(200).sendFile(`./files/${file.file}`)
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
}

module.exports = new Discussion();