const test = require("./middlewires/autenticacion")
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const login = require('./rutas/login');
const historial =require('./rutas/historial')
const factura =require('./rutas/factura')
const factura_det =require('./rutas/factura_det')
const cita =require('./rutas/cita')
const usuario =require('./rutas/usuario')
const paciente =require('./rutas/paciente')
const empleado =require('./rutas/empleado')
const servicio =require('./rutas/servicio')
const tipopago =require('./rutas/pago')
const acceso = require('./rutas/acceso')
const reporte = require('./rutas/reporte')
const add = require('./rutas/addFac')
const logusu = require('./rutas/usulog')

app.use('/login',login);
app.use('/historial',test,historial);
app.use('/factura',test,factura); 
app.use('/det',test,factura_det);
app.use('/cita',test,cita);
app.use('/usuario',usuario);
app.use('/paciente',test,paciente);
app.use('/empleado',test,empleado);
app.use('/servicio',test,servicio);
app.use('/pago',tipopago);
app.use('/acc',acceso);
app.use('/repor',reporte);
app.use('/add',add);
app.use('/logusu',logusu);

const puerto = 3000
app.listen(puerto, function() {
    console.log('Servidor OK en puerto: '+puerto);
});