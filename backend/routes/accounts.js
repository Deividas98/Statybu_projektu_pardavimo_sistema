const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Account = require('../models/account.model');

router.route('/').get((req, res) => {
  Account.find()
    .then(accounts => res.json(accounts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sortbyname').get((req, res) => {
  Account.find().sort({"pavadinimas": 1})
    .then(accounts => res.json(accounts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addacc').post((req, res) => {
  console.log(req.body);
  const pavadinimas = req.body.pavadinimas;
  const salis = req.body.salis;
  const adresas = req.body.adresas;
  const telefonoNr = req.body.telefonoNr;
  const elPastas = req.body.elPastas;
  const kontaktinisAsmuo = req.body.kontaktinisAsmuo;
  const svetaine = req.body.svetaine;
  const lojalumas = req.body.lojalumas;

  const newAccount = new Account({
    pavadinimas,
    salis,
    adresas,
    telefonoNr,
    elPastas,
    kontaktinisAsmuo,
    svetaine,
    lojalumas
  });

  newAccount.save()
  .then(() => res.json('Account added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
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
        account.lojalumas = req.body.lojalumas;
        account.save()
        .then(() => res.json('Account updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/accLoyalty/:imone').get((req, res) => {
  Account.findById(req.params.imone, {"lojalumas": 1, "_id": 1})
   .then(accounts => (res.json(accounts), console.log(accounts.lojalumas)))
   .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
