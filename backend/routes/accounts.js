const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Account = require('../models/account.model');

router.route('/').get((req, res) => {
  Account.find()
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
    .then(accounts => res.json(accounts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addacc').post((req, res) => {
  console.log(req.body);
  const pavadinimas = req.body.pavadinimas;
  const salis = req.body.salis;
  const adresas = req.body.adresas;//req.body.projektas;//kai neparasyta id, reikia prideti id, kai nurodyta id reikia ideti pavadinima
  const telefonoNr = req.body.telefonoNr;
  const elPastas = req.body.elPastas;
  const kontaktinisAsmuo = req.body.kontaktinisAsmuo;
  const svetaine = req.body.svetaine;

  const newAccount = new Account({
    pavadinimas,
    salis,
    adresas,
    telefonoNr,
    elPastas,
    kontaktinisAsmuo,
    svetaine
  });

  newAccount.save()
  .then(() => res.json('Account added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/acc/:id').get((req, res) => {
    Account.findById(req.params.id)
    .then(account => res.json(account))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Account.findByIdAndDelete(req.params.id)
    .then(() => res.json('Account deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateacc/:id').post((req, res) => {
    Account.findById(req.params.id)
    .then(account => {
        account.pavadinimas = req.body.pavadinimas;
        account.salis = req.body.salis;
        account.adresas = req.body.adresas;
        account.telefonoNr = req.body.telefonoNr;
        account.elPastas = req.body.elPastas;
        account.kontaktinisAsmuo = req.body.kontaktinisAsmuo;
        account.svetaine = req.body.svetaine;

        account.save()
        .then(() => res.json('Account updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
