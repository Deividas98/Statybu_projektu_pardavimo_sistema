const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agreementSchema = new Schema({
  pavadinimas: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  imone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  projektas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  sutartiesNumeris: {
    type: String,
    required: false,
    unique: false
  },
  tipas: {
    type: String,
    required: false,
    unique: false
  },
}, {
  timestamps: true,
});

const Agreement = mongoose.model('Agreement', agreementSchema);

module.exports = Agreement;