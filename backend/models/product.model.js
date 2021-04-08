const mongoose = require('mongoose');
//var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  aprasymas: {
    type:  /*mongoose.Types.Decimal128,*/String,
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
  projektas: {//pakeisti!!!
    type: mongoose.Schema.Types.ObjectId,//String,  naudojant id neprisideda irasas is ui
    //required: false,
    //unique: false//,
    ref: 'Project'
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