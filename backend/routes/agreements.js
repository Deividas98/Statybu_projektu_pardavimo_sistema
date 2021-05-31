const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Agreement = require('../models/agreement.model');

router.route('/').get((req, res) => {
  Agreement.find()
    .then(agreements => res.json(agreements))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gauti sutartis pagal susijusias imones
router.route('/accagr/:id').get((req, res) => {
Agreement.find({"imone" : req.params.id})
    .then(agreements => res.json(agreements))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/agrwlookup').get((req, res) => {
  Agreement.aggregate([
          {
            "$lookup":
              {
                "from": "accounts",
                "localField": "imone",
                "foreignField": "_id",
                "as": "imone"
              }  
         },
         {"$unwind":'$imone'},
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
         {"$project": { "pavadinimas": 1, "imone": "$imone.pavadinimas", "projektas": "$projektas.pavadinimas", "sutartiesNumeris": 1, "tipas": 1}}
  ])
    .then(agreements => res.json(agreements))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/listagrsort').get((req, res) => {
  Agreement.aggregate([
          {
            "$lookup":
              {
                "from": "accounts",
                "localField": "imone",
                "foreignField": "_id",
                "as": "imone"
              }  
         },
         {"$unwind":'$imone'},
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
         {"$project": { "pavadinimas": 1, "imone": "$imone.pavadinimas", "projektas": "$projektas.pavadinimas", "sutartiesNumeris": 1, "tipas": 1}}
  ]).sort({"pavadinimas": 1})
    .then(agreements => res.json(agreements))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addagr').post((req, res) => {
  console.log(req.body);
  const pavadinimas = req.body.pavadinimas;
  const projektas = req.body.projektas;
  const imone = req.body.imone;
  const sutartiesNumeris = req.body.sutartiesNumeris;
  const tipas = req.body.tipas;

  const newAgreement = new Agreement({
    pavadinimas,
    imone,
    projektas,
    sutartiesNumeris,
    tipas
  });

  newAgreement.save()
  .then(() => res.json('Agreement added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Agreement.findById(req.params.id)
    .then(agreement => res.json(agreement))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Agreement.findByIdAndDelete(req.params.id)
    .then(() => res.json('Agreement deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateagr/:id').post((req, res) => {
    Agreement.findById(req.params.id)
    .then(agreement => {
        agreement.pavadinimas = req.body.pavadinimas;
        agreement.imone = req.body.imone;
        agreement.projektas = req.body.projektas;
        agreement.sutartiesNumeris = req.body.sutartiesNumeris;
        agreement.tipas = req.body.tipas;

        agreement.save()
        .then(() => res.json('Agreement updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
