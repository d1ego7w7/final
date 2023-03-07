const express = require('express');
const route = express.Router()
const {conexion}= require ('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

route.get('/',(req,res) => {
    let sql = "select codEmpleado ,tipoEmpleado ,sueldo ,ci from empleado;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul)
        }
    });
})


route.get('/:codEmpleado',function(req,res) {
    let sql = "select codEmpleado ,tipoEmpleado ,sueldo ,ci from empleado where codEmpleado =?;"
    conexion.query(sql,[req.params.codEmpleado],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
        tipoEmpleado :req.body.tipoEmpleado ,
        sueldo :req.body.sueldo ,
        ci  :req.body.ci ,        
    }
    
    let sql = 'Insert into empleado set ?';
        conexion.query(sql,data, function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se agregar un campo' });
            }else{
                res.json({ mensaje:'Se agrego un campo' });
            }
        });
});
route.put('/:codEmpleado',function(req,res) {
    let codigo   = req.params.codEmpleado  ;    
    let tipoEmpleado  =req.body.tipoEmpleado  ;
    let sueldo  =req.body.sueldo  ;
    let ci  =req.body.ci  ;
 

    let sql = 'Update empleado set tipoEmpleado = ?, sueldo = ?,ci = ? where codEmpleado = ?';
        conexion.query(sql,[tipoEmpleado ,sueldo ,ci ,codigo],function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo actualizar un campo' });
            }else{
                res.json({ mensaje:'Se actualizo un campo' });
            }
        }); 
      
 });
 route.delete('/:codEmpleado',function(req,res) {
    let codigo = req.params.codEmpleado ;
    let sql = 'Delete from empleado where codEmpleado = ?';
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