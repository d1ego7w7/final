
document.getElementById('insertar-factura-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const url='http://localhost:3000/add';

    const formData = new FormData(event.target);
    const detalles = [];
    
    const detallesRows = document.querySelectorAll('#detalles-factura tr:not(:last-child)');
    detallesRows.forEach(function(row) {
      const detalle = {};
      
     
      const detalleInputs = row.querySelectorAll('input');
      detalleInputs.forEach(function(input) {
        detalle[input.name] = input.value;
      });
      
      detalles.push(detalle);
    });
    
    const dataToSend = {
    tipoDocumento: document.getElementById('tipoDocumento').value,
    numDocumento: document.getElementById('numDocumento').value,
    nombre: document.getElementById('nombre').value,
    codPago: document.getElementById('codPago').value,
      detalles: detalles
    };
    
    axios.post(url, dataToSend)
      .then(function(response) {
        console.log(response);
        alert('Factura insertada correctamente');
        
      })
      .then(()=>location.reload())
      .catch(function(error) {
        console.error(error);
        alert('Error al insertar la factura');
      });
  });
  
  document.getElementById('agregar-factura').addEventListener('click', function() {
    const detallesTable = document.getElementById('detalles-factura');
    const lastRow = detallesTable.rows[detallesTable.rows.length - 2];
    const newRow = lastRow.cloneNode(true);
    const inputs = newRow.querySelectorAll('input');
    
    inputs.forEach(function(input) {
      input.value = '';
    });
    
    detallesTable.insertBefore(newRow, lastRow.nextSibling);
  });


// Obtener datos de facturas
axios.get(url)
  .then(function(response) {
    const add = response.data;

    // Agregar filas a tabla facturas
    const tablaFacturas = document.getElementById('tabla-facturas').getElementsByTagName('tbody')[0];
    add.forEach(function(factura) {
      const fila = tablaFacturas.insertRow();
      fila.insertCell().innerText = factura.codFactura;
      fila.insertCell().innerText = factura.codDetalleFactura;
      fila.insertCell().innerText = factura.tipoDocumento;
      fila.insertCell().innerText = factura.numDocumento;
      fila.insertCell().innerText = factura.nombre;
      fila.insertCell().innerText = factura.codServicio;
      fila.insertCell().innerText = factura.tipoServicio;
      fila.insertCell().innerText = factura.costoUnitario;
      fila.insertCell().innerText = factura.fecha;
    });
  })
  .catch(function(error) {
    console.error(error);
  });

  