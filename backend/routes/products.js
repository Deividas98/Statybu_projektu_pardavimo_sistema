const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const aprasymas = req.body.aprasymas;
  const pavadinimas = req.body.pavadinimas;
  const projektas = req.body.projektas;
  const suma = Number(req.body.suma);
  const kiekis = Number(req.body.kiekis);
  const kaina = Number(req.body.kaina);

  const newProduct = new Product({
    aprasymas,
    pavadinimas,
    projektas,
    suma,
    kiekis,
    kaina
  });

  newProduct.save()
  .then(() => res.json('Product added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        product.aprasymas = req.body.aprasymas;
        product.pavadinimas = req.body.pavadinimas;
        product.projektas = req.body.projektas;
        product.suma = Number(req.body.suma);
        product.kiekis = Number(req.body.kiekis);
        product.kaina = Number(req.body.kaina);

        product.save()
        .then(() => res.json('Product updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
