const token = localStorage.getItem('token');
const url2='http://localhost:3000/add';
const contenedor1=document.getElementById('data1');
let resultado1='';
const carga_add = (add)=>{
    add.forEach(add => {
        resultado1+=`<tr style="border-bottom: 1px solid  #6c567b">
                          <td>${add.codFactura}</td>
                          <td>${add.codDetalleFactura}</td>
                          <td>${add.codPaciente}</td>
                          <td>${add.numDocumento}</td>
                          <td>${add.nombre}</td>
                          <td>${add.codServicio}</td>
                          <td>${add.tipoServicio}</td>
                          <td>${add.costoUnitario}</td>
                          <td>${add.fecha}</td>
                          </tr>`
                        });
                        contenedor1.innerHTML=resultado1;
}    
fetch(url2, {
  method: 'GET',
  headers: { 'Authorization': token
 }
})
.then(response => response.json())
 .then(data1 => carga_add(data1))
.catch(error => console.log(error))