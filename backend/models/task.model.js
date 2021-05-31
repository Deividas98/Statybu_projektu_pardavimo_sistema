const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  tema: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  pradziosData: {
    type: Date
  },
  skirta: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project'
  },
  atlieka: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  pabaigosData: {
    type: Date,
    required: true
  },
  komentaras: {
    type: String
  },
  komentaruSarasas: {
    type: String
  },
  statusas: {
    type: String
  },
  laikas: {
    type: Date
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;