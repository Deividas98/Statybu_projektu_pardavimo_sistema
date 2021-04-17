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
    type: mongoose.Schema.Types.ObjectId,//String,  naudojant id neprisideda irasas is ui
    //required: false,
    //unique: false//,
    ref: 'Account'
  },
  sutartiesNumeris: {
    type: String,
    required: false,
    unique: false
  },
  tipas: {
    type: String,//String,  naudojant id neprisideda irasas is ui
    required: false,
    unique: false
  },
}, {
  timestamps: true,
});

const Agreement = mongoose.model('Agreement', agreementSchema);

module.exports = Agreement;