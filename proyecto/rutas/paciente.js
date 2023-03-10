const express = require('express');
const route = express.Router()
const {conexion}= require ('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

route.get('/',(req,res) => {
    let sql = "select codPaciente ,nombreMascota ,especie ,raza ,color ,tamaño ,peso ,sexo from paciente;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul)
        }
    });
})


route.get('/:codPaciente ',function(req,res) {
    let sql = "select codPaciente ,nombreMascota ,especie ,raza ,color ,tamaño ,peso ,sexo from paciente; where codPaciente =?;"
    conexion.query(sql,[req.params.codPaciente ],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
        nombreMascota :req.body.nombreMascota ,
        especie  :req.body.especie ,
        raza  :req.body.raza ,
        color     :req.body.color  ,
        tamaño   :req.body.tamaño ,
        peso   :req.body.peso ,
        sexo    :req.body.sexo  ,
        
    }
    
    let sql = 'Insert into paciente set ?';
        conexion.query(sql,data, function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se agregar un campo' });
            }else{
                res.json({ mensaje:'Se agrego un campo' });
            }
        });
});
route.put('/:codPaciente',function(req,res) {
    let codigo  = req.params.codPaciente  ;    
    let nombreMascota  =req.body.nombreMascota  ;
    let especie  =req.body.especie  ;
    let raza  =req.body.raza  ;
    let color  =req.body.color ;
    let tamaño   =req.body.tamaño   ;
    let peso   =req.body.peso   ;
    let sexo    =req.body.sexo    ;   

    let sql = 'Update paciente set nombreMascota = ?, especie =?, raza =?, color =?, tamaño =?, peso =?, sexo =? where codPaciente = ?';
    let tok=req.header('Authorization')
        conexion.query(sql,[nombreMascota ,especie ,raza ,color ,tamaño,peso ,sexo,codigo],function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo actualizar un campo' });
            }else{
                res.json({ mensaje:'Se actualizo un campo' });
            }
        }); 
 });
 route.delete('/:codPaciente',function(req,res) {
    let codigo = req.params.codPaciente  ;
    let sql = 'Delete from paciente where codPaciente   = ?';
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