const express = require('express');
const mysql = require('mysql2');

const encrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

const route = express.Router()

const {conexion} = require('../configuracion/database');
route.post('/', async function (req, res) {

    try {
      const { nombres, paterno,materno,ci,direccion,genero,celular,fechaNacimiento,email, detalles } = req.body;
      await conexion.promise().beginTransaction();
    //   let  clave= await encrypt.hash(req.body.contraseña,10);
      const resultVenta = await conexion.promise().query(
        'INSERT INTO usuario (nombres, paterno, materno,ci,direccion,genero,celular,fechaNacimiento,email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombres, paterno,materno,ci,direccion,genero,celular,fechaNacimiento,email]
      );
      const codUsuario = resultVenta[0].insertId;
   
      await Promise.all(

        detalles.map(detalle =>  conexion.promise().query(  
          'INSERT INTO login (codUsuario,usuario, contraseña, usuResponsable) VALUES (?, ?, ?, ?)',
          [codUsuario,detalle.usuario, encrypt.hash(detalle.contraseña,10), detalle.usuResponsable]
        ))
      );
      
      await conexion.promise().commit();
      res.json({
        message: 'Usuario insertado correctamente',
        codUsuario: codUsuario
      });
    } catch (error) {
      await conexion.promise().rollback();
      console.log(error);
      res.status(500).json({
        message: 'Error al insertar la usuario'
      });
    }
  });
  
// route.post('/',async function (req, res){
   
//     try { 
//       const { fechaoper, id_persona, usuario, detalles } = req.body; 
//       await conexion.promise().beginTransaction(); 
//       const resultVenta = await conexion.promise().query( 
//         'INSERT INTO tventa (fechaoper, id_persona, usuario) VALUES (?, ?, ?)', 
//         [fechaoper, id_persona, usuario] 
//       ); 
//       const id_venta = resultVenta[0].insertId; 
//       for (const detalle of detalles) { 
//         await conexion.promise().query( 
//           'INSERT INTO tventa_det (id_venta, id_producto, precio, cantidad, descuento) VALUES (?, ?, ?, ?, ?)', 
//           [id_venta, detalle.id_producto, detalle.precio, detalle.cantidad, detalle.descuento] 
//         ); 
//       } 
//       await conexion.promise().commit(); 
//       res.json({ 
//         message: 'Venta insertada correctamente', 
//         id_venta: id_venta 
//       }); 
//     } catch (error) { 
//       await conexion.promise().rollback(); 
//       console.log(error); 
//       res.status(500).json({ 
//         message: 'Error al insertar la venta' 
//       }); 
//     } 
// });

route.get('/',(req, res) => {
    let sql = "Select id_venta,concat_WS('-',convert(year(fechaoper),char(4)),right(concat('0',convert(month(fechaoper),char(2))),2),right(concat('0',convert(day(fechaoper),char(2))),2)) fechaoper,id_persona,usuario,fech_reg from tventa;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error: "+err.message);
            throw err
        }else{
            //console.log(resul);
            res.json(resul)
        }
    });
});

route.get('/:codigo',function(req,res) {
    let sql = 'Select id_venta,fechaoper,id_persona,usuario,fech_reg from tventa where id_venta=?'
    conexion.query(sql,[req.params.codigo],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});


// http://localhost:3000/ventas/1
route.put('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let fecha = req.body.fechaoper;
    let persona = req.body.id_persona;
    let usuario = req.body.usuario;
    let sql = 'Update tventa set fechaoper = ?, id_persona=?, usuario=? where id_venta = ?';
    conexion.query(sql,[fecha,persona,usuario,codigo],function(err,resul){
        if(err){
            console.log(err.message);
            // throw response.json(error.message);
        }else{
            res.json(resul);
        }
    });
 });
 route.delete('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let sql = 'Delete from tventa where id_venta = ?';
    conexion.query(sql,[codigo],function(err,resul){
        if(err){
            console.log(err.message);
            // throw response.json(error.message);
        }else{
            res.json(resul);
        }
    });
 });


module.exports=route
