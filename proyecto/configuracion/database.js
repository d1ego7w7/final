const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'BDVeterinaria'
})
conexion.connect(function(err) {
    if(err){
       console.log("Error revise tu conexion")
        
    }else{
        console.log('Conexion exitosa !!!');
    }
});

module.exports={conexion}