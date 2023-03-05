const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    name: { type: String, require: true},
    description: { type: String, require: true},
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('taskModel', TaskSchema);