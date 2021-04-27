const router = require('express').Router();
const { Mongoose } = require('mongoose');
const { useCallback } = require('react');
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getProjects').get((req, res) => {
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
         {"$project": { "pavadinimas": 1, "aprasymas": 1, "projektas": "$projektas.pavadinimas",
         "plotasm2":1, "suma": 1, "kiekis": 1, "ebitdaProc":1, "ebitda":1, "pajamos":1, "m2kaina":1, "kaina": 1, "statusas": 1}}
  ]  
  )
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

let projektoId = "";
let projektoPajamos = 0;
router.route('/sumProducts/:projektas'/*/:statusas'*/).get((req, res) => {
  Product.aggregate([
    {"$facet":
    {
      "Pateikta":[
        {"$match":
      {"statusas": /*req.params.statusas*/ "Pateiktas"/*,
       'DOB':
        { $gte: 19400801,
        $lte: 20131231 }*/ } },
    {"$group":
       {"_id": req.params.projektas,//"$projektas",
       "sumBendrasPlotasm2":{ "$sum": "$plotasm2"},
       "sumSuma":{ "$sum": "$suma"},
       "sumPajamos":{ "$sum": "$pajamos"},
       "sumEbitda":{ "$sum": "$ebitda"},
       "sumEbitdaProc":{ "$sum": "$ebitdaProc"},
       "sumBendrasKiekis":{ "$sum": "$kiekis"},
      }
    }
    ],
    "Laimeta": [
      {"$match":
      {"statusas": "Laimėtas"/*,
       'DOB':
        { $gte: 19400801,
        $lte: 20131231 }*/ } },
    {"$group":
       {"_id": req.params.projektas,//"$projektas",
       "sumBendrasPlotasm2":{ "$sum": "$plotasm2"},
       "sumSuma":{ "$sum": "$suma"},
       "sumPajamos":{ "$sum": "$pajamos"},
       "sumEbitda":{ "$sum": "$ebitda"},
       "sumEbitdaProc":{ "$sum": "$ebitdaProc"},
       "sumBendrasKiekis":{ "$sum": "$kiekis"},
      }
    }
    ],
    "Pralaimeta":[
      {"$match":
      {"statusas": "Pralaimėtas"/*,
       'DOB':
        { $gte: 19400801,
        $lte: 20131231 }*/ } },
    {"$group":
       {"_id": req.params.projektas,//"$projektas",
       "sumBendrasPlotasm2":{ "$sum": "$plotasm2"},
       "sumSuma":{ "$sum": "$suma"},
       "sumPajamos":{ "$sum": "$pajamos"},
       "sumEbitda":{ "$sum": "$ebitda"},
       "sumEbitdaProc":{ "$sum": "$ebitdaProc"},
       "sumBendrasKiekis":{ "$sum": "$kiekis"},
      }
    }
    ]
    }

    
    
  }
    
  ])
    .then(products => (res.json(products), projektoPajamos = products[0].esamaslaukas, projektoId = products[0]._id
    //, function(data) { res.render('index', { data: JSON.stringify(data) }); }
    , console.log(projektoPajamos)))
    .catch(err => res.status(400).json('Error: ' + err));
});


function printTheDocToFile(doc) {
  //fs.writeFile(`/Users/Deividas/Desktop/doc_${doc._id}.txt`, doc, 'utf8');
  //console.log(doc);
  //module.exports.variableName = doc;
  return doc;
}
//console.log(doc)

// router.route('/sumProducts').get( async function(req, res, next) {
//   Product.aggregate([
//     {"$match":
//       {"statusas": "Prad4tas"/*,
//        'DOB':
//         { $gte: 19400801,
//         $lte: 20131231 }*/ } },
//     {"$group":
//        {"_id": "$projektas",
//        "esamaslaukas":{ "$sum": "$pajamos"}}} 
//   ], function(err, doc){
//     if (err) { return res.status(509).json({ error: err }); }
//     if (!doc) { return res.status(504).json({ doc: 'none' }); }
//     printTheDocToFile(doc);
//     return res.json(doc);
//   });
// });



//gauti sutartis pagal susijusias imones
router.route('/projprod/:id').get((req, res) => {
  Product.find({"projektas" : req.params.id/*"60856a05a142774d008c3e7c"*/})
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
  //nauja
  const plotasm2 = Number(req.body.plotasm2);
  const pajamos = Number(req.body.pajamos);
  const statusas = req.body.statusas;
  //const ebitdaProc = Number(req.body.ebitdaProc);
  /*const ebitda = Number(req.body.ebitda);
  const ebitdaProc = Number(req.body.ebitdaProc);
  const m2kaina = Number(req.body.m2kaina);*/



  const newProduct = new Product({
    aprasymas,
    pavadinimas,
    projektas,
    suma,
    kiekis,
    kaina,
    plotasm2,
    pajamos,
    statusas/*,
    ebitdaProc,
    ebitda,
    ebitdaProc, 
    m2kaina*/
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
        //nauja
        product.plotasm2 = Number(req.body.plotasm2);
        product.pajamos = Number(req.body.pajamos);
        product.statusas = req.body.statusas;

        product.ebitda = Number(req.body.pajamos) - Number(req.body.suma);
        product.ebitdaProc = ((Number(req.body.pajamos) - Number(req.body.suma)) / Number(req.body.pajamos) * 100);
        product.m2kaina = Number(req.body.plotasm2) * Number(req.body.kiekis);

        product.save()
        .then(() => res.json('Product updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
