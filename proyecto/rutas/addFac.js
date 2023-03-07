const express = require('express');
const mysql = require('mysql2');

const route = express.Router()

const {conexion} = require('../configuracion/database');
route.post('/', async function (req, res) {
    try {
      const { tipoDocumento, numDocumento,nombre,codPago, detalles } = req.body;
      await conexion.promise().beginTransaction();
      const resultVenta = await conexion.promise().query(
        'INSERT INTO factura (tipoDocumento, numDocumento, nombre,codPago) VALUES (?, ?, ?, ?)',
        [tipoDocumento, numDocumento,nombre,codPago]
      );
      const codFactura = resultVenta[0].insertId;
      
      await Promise.all(
        detalles.map(detalle => conexion.promise().query(
          'INSERT INTO detalleFactura (codFactura, codServicio, codEmpleado, codPaciente, costoUnitario, descripcion) VALUES (?, ?, ?, ?, ?, ?)',
          [codFactura, detalle.codServicio, detalle.codEmpleado, detalle.codPaciente, detalle.costoUnitario, detalle.descripcion]
        ))
      );
      
      await conexion.promise().commit();
      res.json({
        message: 'Venta insertada correctamente',
        codFactura: codFactura
      });
    } catch (error) {
      await conexion.promise().rollback();
      console.log(error);
      res.status(500).json({
        message: 'Error al insertar la venta'
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
    let sql = "select factura.codFactura, detallefactura.codDetalleFactura,detallefactura.codPaciente,factura.numDocumento,factura.nombre, servicio.codServicio, servicio.tipoServicio, detalleFactura.costoUnitario,date_format(factura.fecha,'%Y-%m-%d %H:%i:%s')AS fecha from servicio, factura, detalleFactura where factura.codFactura=detalleFactura.codFactura and servicio.codServicio=detalleFactura.codServicio order by(factura.codFactura) desc"
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


module.exports=route
