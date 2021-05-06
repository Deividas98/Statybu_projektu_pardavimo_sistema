const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Resource = require('../models/resources.model');

router.route('/minusres').post((req, res) => {
  Resource.findById("6092964d7d33bfe19049dc90")
  .then(resource => {
    resource.kiekis = Number(req.body.kiekis);
    resource.save()
      .then(() => res.json('Resource updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/plusres').post((req, res) => {
    Resource.findById("6092964d7d33bfe19049dc90")
    .then(resource => {
      resource.kiekis = Number(req.body.kiekis);
      resource.save()
        .then(() => res.json('Resource updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/').get((req, res) => {
  Resource.findById("6092964d7d33bfe19049dc90")
  .then(resource => res.json(resource))
  .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;