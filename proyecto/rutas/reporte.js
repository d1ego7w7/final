const express = require('express');
const { conexion } = require('../configuracion/database');
const route= express.Router();



const query = 'select detalleFactura.codServicio,servicio.tipoServicio,servicio.precio,count(detalleFactura.codServicio) as Solicitados from servicio, factura, detalleFactura where servicio.codServicio=detalleFactura.codServicio and detalleFactura.codFactura=factura.codFactura group by detalleFactura.codServicio order by count(detalleFactura.codServicio) desc;';
route.get('/', (req, res) => {
    conexion.query(query, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});


module.exports=route