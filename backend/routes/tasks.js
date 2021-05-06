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
    { "$project": { "subjektas": 1, "pradziosData": 1, "skirta": "$projektas.pavadinimas", "pabaigosData": 1, "komentaras": 1, "statusas": 1 } }
  ]
  )
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gauti sutartis pagal susijusias imones
router.route('/projtask/:id').get((req, res) => {
  Task.find({ "projektas": req.params.id/*"60856a05a142774d008c3e7c"*/ })
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addtask').post((req, res) => {
  console.log(req.body);
  const subjektas = req.body.subjektas;
  const pradziosData = Date.parse(req.body.pradziosData);
  const skirta = req.body.skirta;//req.body.projektas;//kai neparasyta id, reikia prideti id, kai nurodyta id reikia ideti pavadinima
  const atlieka = req.body.atlieka;
  const pabaigosData = Date.parse(req.body.pabaigosData);
  const komentaras = req.body.komentaras;
  const komentaruSarasas = req.body.komentaruSarasas;
  const statusas = req.body.statusas;

  const newTask = new Task({
    subjektas,
    pradziosData,
    skirta,
    atlieka,
    pabaigosData,
    komentaras,
    komentaruSarasas,
    statusas
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
      task.subjektas = req.body.subjektas;
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

router.route('/sumtasks/:skirta').get((req, res) => {
   Task.find({"skirta": req.params.skirta, "statusas": "Atvira"}).count()
    .then(tasks => (res.json(tasks)))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
