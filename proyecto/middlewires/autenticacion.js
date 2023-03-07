const jwt = require('jsonwebtoken');
const {jwt_secret}=require('../configuracion/parametro')
const test = function(req,res,next){
 let tok= req.header('Authorization');
if(!tok){
    res.json("error")
 }
     if(tok){
    jwt.verify(tok, jwt_secret ,function(err,datos)
        {
        if(err) {
            res.json("invalido");
        }else{
           next()
            }
        })  
       }  
}
module.exports = test

