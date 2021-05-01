const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  subjektas: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  pradziosData: {
    type: Date
  },
  skirta: {//pakeisti!!!
    type: mongoose.Schema.Types.ObjectId,//String,  naudojant id neprisideda irasas is ui
    //required: false,
    //unique: false//,
    ref: 'Project'
  },
  /*atlieka: {//pakeisti!!!
    type: mongoose.Schema.Types.ObjectId,//String,  naudojant id neprisideda irasas is ui
    required: false,
    ref: 'User'
  },*/
  pabaigosData: {
    type: Date,
    required: true
  },
  komentaras: {
    type: String//,
    //required: false,
    //unique: false//,
    //trim: true,
    //minlength: 3
  },
  komentaruSarasas: {
    type: String//,
    //required: false,
    //unique: false//,
    //trim: true,
    //minlength: 3
  },
  laikas: {
    type: Date
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;