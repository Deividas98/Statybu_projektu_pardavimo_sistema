const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
  Task.find()
 //Product.aggregate([
   /*{ "$lookup": {
    "from": "projects",
    //"let": { "projektas": "$products.projektas" },
    "pipeline": [
      { "$match": {
        "$expr": { "$in": ["$$projektas", "$projects._id"] }
      }}//,
      //{ "$unwind": "$projects._id" }
    ],
    "as": "projektas"
  }}
 ])*/
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/getProjects').get((req, res) => {
  Product.aggregate([
          {
            "$lookup":
              {
                "from": "projects",
                "localField": "projektas",
                "foreignField": "_id",
                "as": "projektas"
              }  
         },
         {"$unwind":'$projektas'},
         {"$project": { "pavadinimas": 1, "aprasymas": 1, "projektas": "$projektas.pavadinimas", "suma": 1, "kiekis": 1, "kaina": 1}}
  ]  
  )
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

router.route('/addtask').post((req, res) => {
  console.log(req.body);
  const subjektas = req.body.subjektas;
  const pradziosData = Date(req.body.pradziosData);
  const skirta = req.body.skirta;//req.body.projektas;//kai neparasyta id, reikia prideti id, kai nurodyta id reikia ideti pavadinima
  const atlieka = req.body.atlieka;
  const pabaigosData = Date(req.body.pabaigosData);
  const komentaras = req.body.komentaras;
  const komentaruSarasas = req.body.komentaruSarasas;

  const newTask = new Task({
    subjektas,
    pradziosData,
    skirta,
    atlieka,
    pabaigosData,
    komentaras,
    komentaruSarasas
  });

  newTask.save()
  .then(() => res.json('Task added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/task/:id').get((req, res) => {
    Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/task/:id').delete((req, res) => {
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

        task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
