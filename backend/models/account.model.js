const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  pavadinimas: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  salis: {
    type: String,
    required: false,
    unique: false
  },
  adresas: {
    type: String,
    required: false,
    unique: false
  },
  telefonoNr: {
    type: String,
    required: true,
    unique: false
  },
  elPastas: {
    type: String,
    required: true,
    unique: false
  },
  kontaktinisAsmuo: {
    type: String,
    required: true
  },
  svetaine: {
    type: String,
    required: false
  },
  lojalumas: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;