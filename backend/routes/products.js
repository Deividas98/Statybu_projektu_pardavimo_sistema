const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
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
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getProjects').get((req, res) => {
  Product.aggregate([
    //{ $project : { projektas : 1, _id: 1 } }
/*{
    "from": "projects",
           "let": { "prod_projektas": "$projektas" },
           "pipeline": [
              { "$match":
                 
                       
                         { "$eq": [ "$_id", "$$prod_projektas" ] },
                       
               
              },
              { "$project": { "_id": 0 } }
           ],
           "as": "belekas"
          }*/
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
});

router.route('/add').post((req, res) => {
  console.log(req.body);
  const aprasymas = req.body.aprasymas;
  const pavadinimas = req.body.pavadinimas;
  const projektas = req.body.projektas;//req.body.projektas;//kai neparasyta id, reikia prideti id, kai nurodyta id reikia ideti pavadinima
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
