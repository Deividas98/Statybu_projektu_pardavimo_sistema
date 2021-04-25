const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forecastSchema = new Schema({
  periodoPradzia: {
    type: Date
  },
  projektas: {
    type: mongoose.Schema.Types.ObjectId,//String,  naudojant id neprisideda irasas is ui
    //required: false,
    //unique: false//,
    ref: 'Project'
  },
  periodoPabaiga: {
    type: Date
  },
  isdalintaSuma: {
    type: Number
  },
}, {
  timestamps: true,
});

const Forecast = mongoose.model('Forecast', forecastSchema);

module.exports = Forecast;