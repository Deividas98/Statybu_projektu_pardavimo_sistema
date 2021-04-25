const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Forecast = require('../models/forecast.model');

router.route('/').get((req, res) => {
  Forecast.find()
    .then(forecasts => res.json(forecasts))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gauti prognozes pagal susijusi projekta
router.route('/projfore/:id').get((req, res) => {
Forecast.find({"projektas" : req.params.id/*"60856a05a142774d008c3e7c"*/})
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

//gauti sutartis pagal susijusias imones
router.route('/projfore/:id').get((req, res) => {
  Forecast.find({"projektas" : req.params.id/*"60856a05a142774d008c3e7c"*/})
      .then(forecasts => res.json(forecasts))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/addfore').post((req, res) => {
  console.log(req.body);
  const projektas = req.body.projektas;
  const periodoPradzia = req.body.periodoPradzia;
  const periodoPabaiga = req.body.periodoPabaiga;//req.body.projektas;//kai neparasyta id, reikia prideti id, kai nurodyta id reikia ideti pavadinima
  const isdalintaSuma = req.body.isdalintaSuma;

  const newForecast = new Forecast({
    projektas,
    periodoPradzia,
    periodoPabaiga,
    isdalintaSuma
  });

  newForecast.save()
  .then(() => res.json('Forecastadded!'))
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

module.exports = router;
