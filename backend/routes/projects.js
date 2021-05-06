const router = require('express').Router();
const { Mongoose } = require('mongoose');
let Project = require('../models/project.model');

//http get uzklausa 27video minute aiskina viska
router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/getByProductList').get((req, res) => {
  Project.  .find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

/*router.route('/allprojects').get((req, res) => {
  Project.aggregate([
         {"$unwind":'$numberDecimal'},
         {"$project": { "aprasymas": 1, "pavadinimas": 1, "kontaktas": "$numberDecimal", "projektoSuma": 1, "busena": 1}}
  ]  
  )
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

//gauti projektus pagal susijusia imone
router.route('/projagr/:id').get((req, res) => {
  Project.find({"imone" : req.params.id/*"60856a05a142774d008c3e7c"*/})
      .then(projects => res.json(projects))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//post create project
router.route('/add').post((req, res) => {
  const aprasymas = req.body.aprasymas;
  const pavadinimas = req.body.pavadinimas;
  const imone = req.body.imone;
  const projektoSuma = Number(req.body.projektoSuma);
  const nuolaida = parseFloat(req.body.nuolaida); //Number(req.body.nuolaida);
  const busena = req.body.busena;
  const pradziosData = Date.parse(req.body.pradziosData);
  const pabaigosData = Date.parse(req.body.pabaigosData);

  const newProject = new Project({
      aprasymas,
      pavadinimas,
      imone,
      projektoSuma,
      nuolaida,
      busena,
      pradziosData,
      pabaigosData
    });

  newProject.save()
    .then(() => res.json('Project added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/project/:id').delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
  .then(() => res.json('Project deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateprj/:id').post((req, res) => {
  Project.findById(req.params.id)
  .then(project => {
    project.pavadinimas = req.body.pavadinimas;
    project.aprasymas = req.body.aprasymas;
    project.imone = req.body.imone;
    project.projektoSuma = Number(req.body.projektoSuma);
    //project.nuolaida = parseFloat(req.body.nuolaida);
    project.busena = req.body.busena;
    project.pradziosData = Date.parse(req.body.pradziosData);
    project.pabaigosData = Date.parse(req.body.pabaigosData);
    project.statusas = req.body.statusas;//nauja!!!
    project.resursuKiekis = Number(req.body.resursuKiekis);//nauja!!!

     project.grynasisPelnasSuNuolaida = Number(req.body.grynasisPelnasSuNuolaida);
    // project.laimetaEbitda = Number(req.body.laimetaEbitda);
    // project.mokesciai = Number(req.body.mokesciai);
    // project.laimetaPajamos = Number(req.body.laimetaPajamos);

    project.save()
      .then(() => res.json('Project updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

//naujinti iš produkto
router.route('/updateest/:id').post((req, res) => {
  Project.findById(req.params.id)
  .then(project => {
    project.apskSuma = Number(req.body.apskSuma);
    project.apskBendrasPlotasm2 = Number(req.body.apskBendrasPlotasm2);
    project.apskPajamos = Number(req.body.apskPajamos);
    project.apskEbitda = Number(req.body.apskEbitda);
    project.apskBendrasKiekis = Number(req.body.apskBendrasKiekis);
    project.apskEbitdaProc = Number(req.body.apskEbitdaProc);

    project.laimetaSuma = Number(req.body.laimetaSuma);
    project.laimetaBendrasPlotasm2 = Number(req.body.laimetaBendrasPlotasm2);
    project.laimetaPajamos = Number(req.body.laimetaPajamos);
    project.laimetaEbitda = Number(req.body.laimetaEbitda);
    project.laimetaBendrasKiekis = Number(req.body.laimetaBendrasKiekis);
    project.laimetaEbitdaProc = Number(req.body.laimetaEbitdaProc);

    project.pralaimetaSuma = Number(req.body.pralaimetaSuma);
    project.pralaimetaBendrasPlotasm2 = Number(req.body.pralaimetaBendrasPlotasm2);
    project.pralaimetaPajamos = Number(req.body.pralaimetaPajamos);
    project.pralaimetaEbitda = Number(req.body.pralaimetaEbitda);
    project.pralaimetaBendrasKiekis = Number(req.body.pralaimetaBendrasKiekis);
    project.pralaimetaEbitdaProc = Number(req.body.pralaimetaEbitdaProc);

    project.save()
      .then(() => res.json('Project estimated updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updatelost/:id').post((req, res) => {
  Project.findById(req.params.id)
  .then(project => {
    project.pralaimetaSuma = Number(req.body.pralaimetaSuma);
    project.pralaimetaBendrasPlotasm2 = Number(req.body.pralaimetaBendrasPlotasm2);
    project.pralaimetaPajamos = Number(req.body.pralaimetaPajamos);
    project.pralaimetaEbitda = Number(req.body.pralaimetaEbitda);
    project.pralaimetaBendrasKiekis = Number(req.body.pralaimetaBendrasKiekis);
    project.pralaimetaEbitdaProc = Number(req.body.pralaimetaEbitdaProc);

    project.save()
      .then(() => res.json('Project lost updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updatewon/:id').post((req, res) => {
  Project.findById(req.params.id)
  .then(project => {
    project.laimetaSuma = Number(req.body.laimetaSuma);
    project.laimetaBendrasPlotasm2 = Number(req.body.laimetaBendrasPlotasm2);
    project.laimetaPajamos = Number(req.body.laimetaPajamos);
    project.laimetaEbitda = Number(req.body.laimetaEbitda);
    project.laimetaBendrasKiekis = Number(req.body.laimetaBendrasKiekis);
    project.laimetaEbitdaProc = Number(req.body.laimetaEbitdaProc);

    project.save()
      .then(() => res.json('Project won updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Project.findById(req.params.id)
  .then(project => res.json(project))
  .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;