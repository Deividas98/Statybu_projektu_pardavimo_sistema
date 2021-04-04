const mongoose = require('mongoose');

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
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  suma: {
    type: Number,
    required: false,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
  kiekis: {
    type: Number,
    required: false,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
  kaina: {
    type: Number,
    required: false,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;