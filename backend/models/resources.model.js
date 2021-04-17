const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resourceSchema = new Schema({
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
  telefonoNr: {//pakeisti!!!
    type: String,//String,  naudojant id neprisideda irasas is ui
    required: false,
    unique: false
  },
  elPastas: {//pakeisti!!!
    type: String,//String,  naudojant id neprisideda irasas is ui
    //required: false,
    //unique: false//,
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
}, {
  timestamps: true,
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;