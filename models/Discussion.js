const { Schema, model, Types } = require('mongoose')

const discussionSchema = new Schema({
  title: { type: String, required: true },
  messages: {
    type: Array,
    required: true,
    default: [],
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  project_id: {
    type: Types.ObjectId,
    ref: 'Project',
    required: true,
  },
})

module.exports = model('discussion', discussionSchema)