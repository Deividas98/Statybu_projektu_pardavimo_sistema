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
    type: mongoose.Schema.Types.ObjectId,//String,  naudojant id neprisideda irasas is ui
    ref: 'Account'
  },
  projektoSuma: {
    type: Number,
    required: false,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
  nuolaida: {
    type: String,//mongoose.Types.Decimal128,//Number,
    required: false,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
  busena: {
    type: String,
    required: true,
    unique: false//,
    //trim: true,
    //minlength: 3
  },
  kaina: {
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
  mokesciai: {
    type: Number,
    required: false,
    unique: false
  },
  grynasisPelnas: {
    type: Number,
    required: false,
    unique: false,
    default: function() {
      return (this.laimetaEbitda - this.mokesciai)
    }
  },
  nuolaidaProc: {
    type: Number,
    required: false,
    unique: false
  },
  grynasisPelnasSuNuolaida: {
    type: Number,
    required: false,
    unique: false,
    default: function() {
      return (this.laimetaEbitda - this.mokesciai - (this.laimetaPajamos * (this.nuolaidaProc / 100)))
    }
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;