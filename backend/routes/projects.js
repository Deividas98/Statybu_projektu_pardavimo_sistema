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

//post create project
router.route('/add').post((req, res) => {
  const aprasymas = req.body.aprasymas;
  const pavadinimas = req.body.pavadinimas;
  const kontaktas = req.body.kontaktas;
  const projektoSuma = Number(req.body.projektoSuma);
  const nuolaida = parseFloat(req.body.nuolaida); //Number(req.body.nuolaida);
  const busena = req.body.busena;

  const newProject = new Project({
      aprasymas,
      pavadinimas,
      kontaktas,
      projektoSuma,
      nuolaida,
      busena
    });

  newProject.save()
    .then(() => res.json('Project added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;