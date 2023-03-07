const express = require('express');
const route = express.Router()
const {conexion}= require ('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

route.get('/',(req,res) => {
    let sql = "select ci,nombres,paterno,materno,direccion,genero,celular,date_format(fechaNacimiento,'%Y-%m-%d')AS fechaNacimiento,email from usuario;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul)
        }
    });
})


route.get('/:ci',function(req,res) {
    let sql = "select ci,nombres,paterno,materno,direccion,genero,celular,date_format(fechaNacimiento,'%Y-%m-%d')AS fechaNacimiento,email from usuario where codUsuario=?;"
    conexion.query(sql,[req.params.ci],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
        ci  :req.body.ci,
        nombres:req.body.nombres,
        paterno :req.body.paterno,
        materno :req.body.materno,
        direccion  :req.body.direccion,
        genero  :req.body.genero,
        celular  :req.body.celular,
        fechaNacimiento  :req.body.fechaNacimiento,
        email   :req.body.email
        
    }
    
    let sql = 'Insert into usuario set ?';
        conexion.query(sql,data, function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se agregar un campo' });
            }else{
                res.json({ mensaje:'Se agrego un campo' });
            }
        });
});
route.put('/:ci',function(req,res) {
    let codigo=req.params.ci;   
    let nombres =req.body.nombres ;
    let paterno =req.body.paterno ;
    let materno =req.body.materno ;
    let direccion  =req.body.direccion  ;
    let genero  =req.body.genero  ;
    let celular  =req.body.celular  ;
    let fechaNacimiento  =req.body.fechaNacimiento;
    let email   =req.body.email   
 

    let sql = 'Update usuario set nombres = ?, paterno = ?, materno = ?, direccion = ?, genero = ?, celular = ?, fechaNacimiento = ?, email = ? where ci = ?';
        conexion.query(sql,[nombres ,paterno ,materno ,direccion,genero ,celular ,fechaNacimiento ,email,codigo],function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo actualizar un campo' });
            }else{
                res.json({ mensaje:'Se actualizo un campo' });
            }
        }); 
 });
 route.delete('/:ci',function(req,res) {
    let codigo = req.params.ci ;
    let sql = 'Delete from usuario where ci  = ?';
        conexion.query(sql,[codigo],function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo eliminar un campo' });
            }else{
                res.json({ mensaje:'Se elimino un campo' });
            }
        });
});



module.exports=route