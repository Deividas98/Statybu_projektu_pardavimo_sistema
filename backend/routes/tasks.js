const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/alltaskslookup').get((req, res) => {
  Task.aggregate([
    {
      "$lookup":
      {
        "from": "projects",
        "localField": "skirta",
        "foreignField": "_id",
        "as": "projektas"
      }
    },
    { "$unwind": '$projektas' },
    {
      "$lookup":
      {
        "from": "users",
        "localField": "atlieka",
        "foreignField": "_id",
        "as": "naudotojas"
      }
    },
   { "$unwind": '$naudotojas' },
    { "$project": { "tema": 1, "pradziosData": 1, "pabaigosData": 1, "skirta": "$projektas.pavadinimas", "atlieka": "$naudotojas.username", "komentaras": 1, "statusas": 1} }
    //gal dar itraukti laiko parametra
  ]
  )
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gauti sutartis pagal susijusias imones
router.route('/projtask/:id').get((req, res) => {
  Task.find({ "projektas": req.params.id })
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addtask').post((req, res) => {
  console.log(req.body);
  const tema = req.body.tema;
  const pradziosData = Date.parse(req.body.pradziosData);
  const skirta = req.body.skirta;
  const atlieka = req.body.atlieka;
  const pabaigosData = Date.parse(req.body.pabaigosData);
  const komentaras = req.body.komentaras;
  const komentaruSarasas = req.body.komentaruSarasas;
  const statusas = req.body.statusas;
  const laikas = Date.parse("1970-01-01T00:00:00.000+00:00");

  const newTask = new Task({
    tema,
    pradziosData,
    skirta,
    atlieka,
    pabaigosData,
    komentaras,
    komentaruSarasas,
    statusas,
    laikas
  });

  newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updatetask/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.tema = req.body.tema;
      task.pradziosData = Date(req.body.pradziosData);
      task.skirta = req.body.skirta;
      task.atlieka = req.body.atlieka;
      task.pabaigosData = Date(req.body.pabaigosData);
      task.komentaras = req.body.komentaras;
      task.komentaruSarasas = req.body.komentaruSarasas;
      task.statusas = req.body.statusas;

      task.laikas = req.body.laikas;

      task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

var ObjectID = require('mongodb').ObjectID;
router.route('/sumtasks/:skirta').get((req, res) => {
   Task.find({"skirta": ObjectID(req.params.skirta), "statusas": "Atvira"}).count()
    .then(tasks => (res.json(tasks)))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
