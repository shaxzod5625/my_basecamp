const { Schema, model, Types } = require('mongoose')

const fileSchema = new Schema({
  file: { type: String, required: true },
  name: { type: String, required: true },
  project_id: {
    type: Types.ObjectId,
    ref: 'Project',
    required: true
  },
})

module.exports = model('File', fileSchema)