// let chai = require("chai");
// let chaiHttp = require("../ chai-http");
// let server = require("../server");
// //let request2 = require("request")

// chai.should();

// chai.use(chaiHttp);

// describe('Agreements API', ()=>{
//     it("It should get all agreements", (done)=> {
//         chai.request(server)
//         .get("/agreements")
//         .end((err, response)=>{
//             response.should.have.status(200);
//             response.body.should.be.a('array');
//             response.body.length.should.be.eq(3);
//             done();
//         })
//     })
// })

const supertest = require("supertest");
const assert = require('assert');
const app = require("../server");
const { connect } = require("../server");

//const conn = require('../')

// describe('tekstas', (d)=>{
//     before((done) => {
//         connect
//         .connectDB()
//         .then(()=> done())
//         .catch((err)=> done(err));
//     });
// });

// after((done)=>{
//     connect
//     .closeDB()
//     .then(()=> done())
//     .catch((err)=> done(err));
// });

describe("GET /", function() {

    var conn;
  beforeEach(function () {
     conn = require('../server');
  });
    afterEach(function (done) {
        conn.close(done);
      });

    it("it should has status code 200", function(done) {
      supertest(app)
        .get("/agreements")
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
       });
    });

    it("it shoud return status code 200 is name exists", function(done) {
        supertest(app)
          .post("/addagr")
          .send({ 
              pavadinimas: "Rankava sutartis",
              projektas: "60ac19c9ae52b14f482e708f",
              imone: "60ac1860ae52b14f482e708e",
              sutartiesNumeris: "RS-100",
              tipas: "Preliminari"
  
           })
          .expect(200)
          .end(function(err, res){
            if (err) done(err);
            done();
          });
      });

  });

    // it("it should has status code 200", (done)=> {
    //   supertest(app)
    //     .get("/agreements")
    //     .expect(200, 'sekmingai', done);
    // });

//   describe("POST /", function(){
//     it("it shoud return status code 200 is name exists", function(done) {
//       supertest(app)
//         .post("/addagr")
//         .send({ 
//             pavadinimas: "Rankava sutartis",
//             projektas: "60ac19c9ae52b14f482e708f",
//             imone: "60ac1860ae52b14f482e708e",
//             sutartiesNumeris: "RS-100",
//             tipas: "Preliminari"

//          })
//         .expect(200)
//         .end(function(err, res){
//           if (err) done(err);
//           done();
//         });
//     });
//   });

