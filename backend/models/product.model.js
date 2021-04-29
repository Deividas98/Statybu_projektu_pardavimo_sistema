const mongoose = require('mongoose');
//var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const productSchema = new Schema({
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
  projektas: {
    type: mongoose.Schema.Types.ObjectId,//String,  naudojant id neprisideda irasas is ui
    ref: 'Project'
  },
  suma: {//cia product cogs
    type: Number,
    required: false,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
  kiekis: {
    type: Number,
    required: false,
    unique: false
  },
  kaina: {
    type: Number,
    required: false,
    unique: false
  },
  plotasm2: {
    type: Number,
    required: false,
    unique: false
  },
  pajamos: {//revenue
    type: Number,
    required: false,
    unique: false
  },
  ebitda: {
    type: Number,
    required: false,
    unique: false,
    default: function() {
      return this.pajamos - this.suma
    }
  },
  m2kaina: {
    type: Number,
    required: false,
    unique: false,
    default: function() {
      return this.plotasm2 / this.kiekis
    }
  },
  ebitdaProc: {
    type: Number,
    required: false,
    unique: false,
    default: function() {
      return ((this.pajamos - this.suma) / this.pajamos * 100)
    }
  },
  statusas: {
    type: String,
    required: true,
    unique: false
  },
  pajamosSuNuolaida: {//gal ir nereikia, o uzteks tai suskaiciuoti i pajamas
    type: Number,
    required: false,
    unique: false,
    default: function() {
      return (this.pajamos - (this.pajamos * 0,05))
    }
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;