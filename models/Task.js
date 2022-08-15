const { Schema, model, Types } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  compleated: {
    type: Boolean,
    default: false,
  },
  project_id: {
    type: Types.ObjectId,
    ref: 'Project',
    required: true,
  },
})

module.exports = model('Task', taskSchema);