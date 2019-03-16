const mongoose = require('mongoose');

// Define Schemes
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  checked: { type: Boolean, default: false },
  color: { type: String },
  date: { type: Date },
  id: mongoose.Schema.Types.ObjectId
},
{
  timestamps: true
});

// Create new todo document
todoSchema.statics.create = function (payload) {
  const todo = new this(payload);
  return todo.save();
};

// Find All
todoSchema.statics.findAll = function () {
  return this.find({});
};

// Find One by todoid
todoSchema.statics.findOneByTodoid = function (todoid) {
  return this.findOne({ _id: todoid });
};

// Update by todoid
todoSchema.statics.updateByTodoid = function (todoid, payload) {
  return this.findOneAndUpdate({ _id: todoid }, payload);
};

// Check by todoid
todoSchema.statics.checkByTodoid = function (todoid) {
  return this.findOneAndUpdate({ _id: todoid }, { checked: true });
};

// Uncheck by todoid
todoSchema.statics.uncheckByTodoid = function (todoid) {
  return this.findOneAndUpdate({ _id: todoid }, { checked: false });
};

// Delete by todoid
todoSchema.statics.deleteByTodoid = function (todoid) {
  return this.deleteOne({ _id: todoid });
};

// Create Model & Export
module.exports = mongoose.model('Todo', todoSchema);
