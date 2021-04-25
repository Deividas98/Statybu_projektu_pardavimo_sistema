const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Project = require('../models/project.model');

//http get uzklausa 27video minute aiskina viska
router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/getByProductList').get((req, res) => {
  Project.  .find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

/*router.route('/allprojects').get((req, res) => {
  Project.aggregate([
         {"$unwind":'$numberDecimal'},
         {"$project": { "aprasymas": 1, "pavadinimas": 1, "kontaktas": "$numberDecimal", "projektoSuma": 1, "busena": 1}}
  ]  
  )
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

//gauti projektus pagal susijusia imone
router.route('/projagr/:id').get((req, res) => {
  Project.find({"imone" : req.params.id/*"60856a05a142774d008c3e7c"*/})
      .then(projects => res.json(projects))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//post create project
router.route('/add').post((req, res) => {
  const aprasymas = req.body.aprasymas;
  const pavadinimas = req.body.pavadinimas;
  const imone = req.body.imone;
  const projektoSuma = Number(req.body.projektoSuma);
  const nuolaida = parseFloat(req.body.nuolaida); //Number(req.body.nuolaida);
  const busena = req.body.busena;

  const newProject = new Project({
      aprasymas,
      pavadinimas,
      imone,
      projektoSuma,
      nuolaida,
      busena
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
    project.projektoSuma = Number(req.body.projektoSuma);
    project.nuolaida = parseFloat(req.body.nuolaida);
    project.busena = req.body.busena;

    project.save()
      .then(() => res.json('Project updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;