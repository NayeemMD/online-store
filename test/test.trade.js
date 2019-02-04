let chaiHttp = require('chai-http');
let server = require('../bin/www');
//const app = require('app');


var chai = require('chai');
let should = chai.should();
var expect  = require('chai').expect;
chai.use(chaiHttp);

var request = require('request');
var itemOfShirt = {username:"Nayeem",password:"Nammu",items:"shirt"};
var allUniqueSingleItems = {username:"Nayeem",password:"Nammu",items:["shirt","hat","pant"]};


describe('shopping', function() {

    it('validate for single parameter cost passed',function(){
         chai.request(server)
          .post('/trade')
          .send(itemOfShirt)
          .end(function(err,res){
            res.should.have.status(200);
            expect(res.body.state).to.be.true;
            res.body.should.have.property('totalPrice');
            expect(res.totalPrice).to.equal("20.00");
            done();
          });
    });
    it('validate for all unique parameters',function(){
                     chai.request(server)
                      .post('/trade')
                      .send(allUniqueSingleItems)
                      .end(function(err,res){
                        res.should.have.status(200);
                        expect(res.body.state).to.be.true;
                        res.body.should.have.property('totalPrice');
                        expect(res.totalPrice).to.equal("32.50");
                        done();
                      });
    });

});