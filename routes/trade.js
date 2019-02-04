var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
const bodyParser = require('body-parser');


router.post('/',function(req, res) {
      var items = [];
       items = req.body.items;
      let pants =0.00,shirts=0.00,hats=0.00;
      var totalPrice,discount,payAmount;
      var itemsCost = {"pant":5.00,"shirt":20.00,"hat":7.50};
      var itemsCostReduced = {"pant":5.00,"shirt":19.00,"hat":7.50};
      if(items === 'pant' || items === 'hat' ||items === 'tshirt'  ){
           totalPrice = (items === 'pant')? itemsCost.pant:(items === 'hat')? itemsCost.hat: itemsCost.shirt;
           discount= 0;
           payAmount = totalPrice;
      } else{
              items.forEach(function(item){
                  if(item === 'pant'){
                      pants++;
                  }else if(item === 'hat'){
                      hats++;
                  }else{
                      shirts++;
                  }
              });
               totalPrice = (pants * itemsCost.pant) + (hats * itemsCost.hat) + (shirts * itemsCost.shirt);
               payAmount = (hats * itemsCost.hat);
              if(shirts >2){
                   payAmount += (shirts * itemsCostReduced.shirt);
              } else{
                  payAmount += (shirts * itemsCost.shirt);
              }
              if(pants <2){
                  payAmount += (pants) * itemsCost.pant;
              } else if(pants%2 === 0){
                 payAmount += ((pants/2) * itemsCost.pant);
               } else{
                   payAmount += (((pants-1)/2) * itemsCost.pant) + (itemsCost.pant);
               }
             discount = totalPrice - payAmount;
        }
      var userCost = {user : req.user,"totalPrice": totalPrice,"discount": discount, "pay":payAmount};
     res.render('ejs\\shopping.ejs',userCost);
});


module.exports = router;
