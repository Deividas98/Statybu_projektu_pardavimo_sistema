const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Project = require('../models/project.model');

//http get uzklausa 27video minute aiskina viska
router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gauti projektus pagal susijusia imone
router.route('/projagr/:id').get((req, res) => {
  Project.find({ "imone": req.params.id })
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/allprojects').get((req, res) => {
  Project.aggregate([
    {
      "$lookup":
      {
        "from": "accounts",
        "localField": "imone",
        "foreignField": "_id",
        "as": "imone"
      }
    },
    { "$unwind": '$imone' },
    { "$project": { "pavadinimas": 1, "aprasymas": 1, "grynasisPelnas": 1, "imone": "$imone.pavadinimas", "pradziosData": { "$dateToString": { "format": "%Y-%m-%d", "date": "$pradziosData" } }, "pabaigosData": { "$dateToString": { "format": "%Y-%m-%d", "date": "$pabaigosData" } }, "statusas": 1 } }
    //gal dar itraukti laiko parametra
  ]
  ).sort({ "createdAt": -1 })
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/projectssort').get((req, res) => {
  Project.aggregate([
    {
      "$lookup":
      {
        "from": "accounts",
        "localField": "imone",
        "foreignField": "_id",
        "as": "imone"
      }
    },
    { "$unwind": '$imone' },
    { "$project": { "pavadinimas": 1, "aprasymas": 1, "grynasisPelnas": 1, "imone": "$imone.pavadinimas", "pradziosData": { "$dateToString": { "format": "%Y-%m-%d", "date": "$pradziosData" } }, "pabaigosData": { "$dateToString": { "format": "%Y-%m-%d", "date": "$pabaigosData" } }, "statusas": 1 } }
    //gal dar itraukti laiko parametra
  ]
  ).sort({ "statusas": 1 })
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

//post create project
router.route('/add').post((req, res) => {
  const aprasymas = req.body.aprasymas;
  const pavadinimas = req.body.pavadinimas;
  const imone = req.body.imone;
  const busena = req.body.busena;
  const statusas = "Atviras";
  const pradziosData = Date.parse(req.body.pradziosData);
  const pabaigosData = Date.parse(req.body.pabaigosData);
  const atvirosUzduotys = 0;
  const grynasisPelnas = 0;
  const resursuKiekis = 0;

  const newProject = new Project({
    aprasymas,
    pavadinimas,
    imone,
    busena,
    pradziosData,
    pabaigosData,
    atvirosUzduotys,
    grynasisPelnas,
    resursuKiekis,
    statusas
  });

  newProject.save()
    .then(() => res.json('Project added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/project/:id').delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json('Project deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateprj/:id').post((req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      project.pavadinimas = req.body.pavadinimas;
      project.aprasymas = req.body.aprasymas;
      project.imone = req.body.imone;
      project.busena = req.body.busena;
      project.pradziosData = Date.parse(req.body.pradziosData);
      project.pabaigosData = Date.parse(req.body.pabaigosData);
      project.statusas = req.body.statusas;//nauja!!!
      project.resursuKiekis = Number(req.body.resursuKiekis);//nauja!!!

      project.grynasisPelnasSuNuolaida = Number(req.body.grynasisPelnasSuNuolaida);
      // project.laimetaEbitda = Number(req.body.laimetaEbitda);
      // project.mokesciai = Number(req.body.mokesciai);
      // project.laimetaPajamos = Number(req.body.laimetaPajamos);
      project.grynasisPelnasProc = Number(req.body.grynasisPelnasProc);
      project.grynasisPelnas = Number(req.body.grynasisPelnas);

      project.save()
        .then(() => res.json('Project updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//naujinti iš produkto
router.route('/updateest/:id').post((req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      project.apskSuma = Number(req.body.apskSuma);
      project.apskBendrasPlotasm2 = Number(req.body.apskBendrasPlotasm2);
      project.apskPajamos = Number(req.body.apskPajamos);
      project.apskEbitda = Number(req.body.apskEbitda);
      project.apskBendrasKiekis = Number(req.body.apskBendrasKiekis);
      project.apskEbitdaProc = Number(req.body.apskEbitdaProc);

      project.laimetaSuma = Number(req.body.laimetaSuma);
      project.laimetaBendrasPlotasm2 = Number(req.body.laimetaBendrasPlotasm2);
      project.laimetaPajamos = Number(req.body.laimetaPajamos);
      project.laimetaEbitda = Number(req.body.laimetaEbitda);
      project.laimetaBendrasKiekis = Number(req.body.laimetaBendrasKiekis);
      project.laimetaEbitdaProc = Number(req.body.laimetaEbitdaProc);

      project.pralaimetaSuma = Number(req.body.pralaimetaSuma);
      project.pralaimetaBendrasPlotasm2 = Number(req.body.pralaimetaBendrasPlotasm2);
      project.pralaimetaPajamos = Number(req.body.pralaimetaPajamos);
      project.pralaimetaEbitda = Number(req.body.pralaimetaEbitda);
      project.pralaimetaBendrasKiekis = Number(req.body.pralaimetaBendrasKiekis);
      project.pralaimetaEbitdaProc = Number(req.body.pralaimetaEbitdaProc);

      project.save()
        .then(() => res.json('Project estimated updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/rev/2').get((req, res) => {
  Project.aggregate([
    {
      "$group": {
        "_id": null,
        "estrevenue": { "$sum": "$apskPajamos" }
      }
    }
  ])
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;