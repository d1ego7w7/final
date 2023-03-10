const express = require('express');

const route = express.Router();
const encrypt = require('bcryptjs')
const {conexion}=require('../configuracion/database')
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

route.get('/',(req, res) => {
    
    let sql = "Select usuario,contraseña,ci,usuResponsable,date_format(fechaCreacion,'%Y/%m/%d %H:%i:%s')AS fechaCreacion from login;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul);
        }
    });
});
route.get('/:usuario',(req, res) => {   
    let sql = "Select usuario,contraseña,ci,usuResponsable,date_format(fechaCreacion,'%Y/%m/%d %H:%i:%s')AS fechaCreacion from login where usuario=?;"
    conexion.query(sql,[req.params.usuario],function(err,resul){
        if(err){
            console.log("Error");
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',async function(req,res) {
    let clave_encryptada  = await encrypt.hash(req.body.contraseña,10)
    let data = {
        usuario:req.body.usuario,
        contraseña:clave_encryptada,
        ci:req.body.ci,
        usuResponsable:req.body.usuResponsable
      }
    let sql = 'Insert into login set ?';

        conexion.query(sql,data,function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo adicionar un campo' });
            }else{
                res.json({ mensaje:'Se adiciono un campo' });
            }
        });
});



//----------------------------------
route.post('/compara', async (req, res) => {
    const usuario = req.body.usuario;
    let sql = 'select usuario, contraseña from login where usuario = ?';
    conexion.query(sql, [usuario], async function(error, results)  {
      if (error) {
        console.error('Error al recuperar la contraseña: ' + error.stack);
        res.json("error");
        return;
      }
      if (results.length == 0) {
        res.json('Usuario no encontrado');
        return;
      }
      const contra= results[0].contraseña;
      await encrypt.compare(req.body.contraseña, contra)
        .then((result) => {
          if (result) {
            res.json('Dato correcto');
          } else {
            res.json('Dato incorrecto');
          }
        })
      });
    });
//----------------------------
    
route.put('/:usuario', async function(req,res) {
    let clave_encryptada  = await encrypt.hash(req.body.contraseña,10)
    let usuario = req.params.usuario;
    let contraseña = clave_encryptada;
    let ci = req.body.ci;
    let usuResponsable = req.body.usuResponsable;
    let sql = 'Update login set contraseña = ?, ci=?, usuResponsable=? where usuario = ?';
   
        conexion.query(sql,[contraseña,ci,usuResponsable,usuario],function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo actualizar un campo' });
            }else{
                res.json({ mensaje:'Se actualizo un campo' });
            }
        });
 });
 route.delete('/:usuario',function(req,res) {
    let usuario = req.params.usuario;
    let sql = 'Delete from login where usuario = ?';
    let tok=req.header('Authorization')
        conexion.query(sql,[usuario],function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo eliminar un campo' });
            }else{
                res.json({ mensaje:'Se elimino un campo' });
            }
        });
 });

module.exports =  route 