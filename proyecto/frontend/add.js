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