const { Schema, model, Types } = require('mongoose');

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
})

module.exports = model('Project', projectSchema);