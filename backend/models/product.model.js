const mongoose = require('mongoose');
//var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  aprasymas: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  pavadinimas: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  projektas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  suma: {//cia product cogs
    type: Number,
    required: false,
    unique: false
  },
  kiekis: {
    type: Number,
    required: false,
    unique: false
  },
  kaina: {//nzn ar reikia
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
  pajamosSuNuolaida: {
    type: Number,
    required: false,
    unique: false,
    default: function() {
      return (this.pajamos - (this.pajamos * 0.05))//buvo 0,05
    }
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;