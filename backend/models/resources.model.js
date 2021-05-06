const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  pavadinimas: {
    type: String,
    unique: false,
    trim: true
  },
  kiekis: {
    type: Number
  },
}, {
  timestamps: true,
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;