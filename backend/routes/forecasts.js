const router = require('express').Router();
const { Mongoose, now } = require('mongoose');
let Forecast = require('../models/forecasts.model');

router.route('/').get((req, res) => {
  Forecast.find()
    .then(forecasts => res.json(forecasts))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/agrwlookup').get((req, res) => {
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
         {"$project": { "subjektas": 1, "pradziosData": 1, "skirta": "$imone.pavadinimas", "pabaigosData": 1, "komentaras": 1}}
  ]  
  )
    .then(agreements => res.json(agreements))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

//gauti projekto prognozes FIND BY THEN AGREGATE!!!
router.route('/projfore/:id').get((req, res) => {
  Forecast.find({"projektas" : req.params.id}, { "periodoPradzia": {"$dateToString": {"date":"$periodoPradzia","timezone":"Europe/Vilnius"}}, "periodoPabaiga": {"$dateToString": {"date":"$periodoPabaiga","timezone":"Europe/Vilnius"}}, "isdalintaSuma":1})
  .sort({"periodoPradzia": 1})
      .then(forecasts => res.json(forecasts))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/addfore').post((req, res) => {
  console.log(req.body);
  const projektas = req.body.projektas;
  const periodoPradzia = Date.parse(req.body.periodoPradzia);
  const periodoPabaiga = Date.parse(req.body.periodoPabaiga);
  const isdalintaSuma = req.body.isdalintaSuma;

  const newForecast = new Forecast({
    projektas,
    periodoPradzia,
    periodoPabaiga,
    isdalintaSuma
  });

  newForecast.save()
  .then(() => res.json('Forecast added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/fore/:id').get((req, res) => {
    Forecast.findById(req.params.id)
    .then(forecast => res.json(forecast))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Forecast.findByIdAndDelete(req.params.id)
    .then(() => res.json('Forecast deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//ar veikia?
router.route('/dltfore/:projektas').delete((req, res) => {
  Forecast.deleteMany({"projektas": req.params.projektas})
  .then(() => res.json('Forecast deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getforetime').get((req, res) => {
  Forecast.aggregate([
         {"$project": { "projektas": 1, "periodoPradzia": {"$dateToString": {"date":"$periodoPradzia","timezone":"Europe/Vilnius"}}, "periodoPabaiga": {"$dateToString": {"date":"$periodoPabaiga","timezone":"Europe/Vilnius"}}, "isdalintaSuma":1}}
  ])
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
