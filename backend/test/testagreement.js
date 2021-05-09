let chai = require("chai");
let chaiHttp = require("../ chai-http");
let server = require("../server");
//let request2 = require("request")

chai.should();

chai.use(chaiHttp);

describe('Agreements API', ()=>{
    it("It should get all agreements", (done)=> {
        chai.request(server)
        .get("/agreements")
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            response.body.length.should.be.eq(3);
            done();
        })
    })
})