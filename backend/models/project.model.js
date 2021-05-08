const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
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
  imone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  projektoSuma: {//nezinau ar reikia
    type: Number,
    required: false,
    unique: false
  },
  pradziosData: {
    type: Date
  },
  pabaigosData: {
    type: Date
  },
  nuolaida: {//ar nereikia kito tipo //pasitikslinti kurimo ir updato metu
    type: String,//mongoose.Types.Decimal128,//Number,
    required: false,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
  busena: {
    type: String,
    required: true,
    unique: false
  },
  statusas: {
    type: String,
    unique: false
  },
  kaina: {//pasitikslinti. kurimo metu net nera jos. gal net nereikia
    type: Number,
    required: false,
    unique: false
  },
  resursuKiekis: {
    type: Number,
    required: false,
    unique: false
  },

  apskSuma: {//cia product cogs
    type: Number,
    required: false,
    unique: false//,
  },
  apskBendrasPlotasm2: {
    type: Number,
    required: false,
    unique: false
  },
  apskPajamos: {//revenue
    type: Number,
    required: false,
    unique: false
  },
  apskEbitda: {
    type: Number,
    required: false,
    unique: false
  },
  apskBendrasKiekis: {
    type: Number,
    required: false,
    unique: false
  },
  apskEbitdaProc: {
    type: Number,
    required: false,
    unique: false,
  },

  laimetaSuma: {//cia product cogs
    type: Number,
    required: false,
    unique: false//,
  },
  laimetaBendrasPlotasm2: {
    type: Number,
    required: false,
    unique: false
  },
  laimetaPajamos: {//revenue
    type: Number,
    required: false,
    unique: false
  },
  laimetaEbitda: {
    type: Number,
    required: false,
    unique: false
  },
  laimetaBendrasKiekis: {
    type: Number,
    required: false,
    unique: false
  },
  laimetaEbitdaProc: {
    type: Number,
    required: false,
    unique: false,
  },

  pralaimetaSuma: {//cia product cogs
    type: Number,
    required: false,
    unique: false//,
  },
  pralaimetaBendrasPlotasm2: {
    type: Number,
    required: false,
    unique: false
  },
  pralaimetaPajamos: {//revenue
    type: Number,
    required: false,
    unique: false
  },
  pralaimetaEbitda: {
    type: Number,
    required: false,
    unique: false
  },
  pralaimetaBendrasKiekis: {
    type: Number,
    required: false,
    unique: false
  },
  pralaimetaEbitdaProc: {
    type: Number,
    required: false,
    unique: false
  },
  atvirosUzduotys: {
    type: Number,
    required: false,
    unique: false
  },
  mokesciai: {//gal nereikes
    type: Number,
    required: false,
    unique: false
  },
  grynasisPelnas: {//gross profit
    type: Number,
    required: false,
    unique: false,
    default: function() {
      //return (this.laimetaEbitda - this.mokesciai)
      return (this.laimetaPajamos - this.laimetaSuma)
    }
  },
  grynasisPelnasProc: {//gross profit proc
    type: Number,
    required: false,
    unique: false
  },
  nuolaidaProc: {
    type: Number,
    required: false,
    unique: false
  },
  grynasisPelnasSuNuolaida: {
    type: Number,
    required: false,
    unique: false//,
    // default: function() {
    //   return (this.laimetaEbitda - this.mokesciai - (this.laimetaPajamos * (this.nuolaidaProc / 100)))
    // }
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;