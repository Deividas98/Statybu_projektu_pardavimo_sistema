const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  aprasymas: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    minlength: 3
  },
  pavadinimas: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  kontaktas: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  projektoSuma: {
    type: Number,
    required: false,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
  nuolaida: {
    type: mongoose.Types.Decimal128,//Number,
    required: false,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
  busena: {
    type: String,
    required: true,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;