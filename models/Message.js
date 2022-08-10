const { Schema, model, Types } = require('mongoose')

const messageSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: { type: String, required: true },
  discussion_id: {
    type: Types.ObjectId,
    ref: 'Discussion',
    required: true,
  },
})

module.exports = model('Message', messageSchema)