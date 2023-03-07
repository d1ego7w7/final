axios.get('http://localhost:3000/repor')
  .then(response => {
    const datos = [];

    response.data.forEach((fila) => {
      const objeto = {
        nombre: fila.tipoServicio,
        solicitados: fila.Solicitados
      };
      datos.push(objeto);
    });
    var $arrColors = ['#34495E', '#26B99A',  '#666', '#3498DB','#C70039','#581845'];
    new Morris.Bar({
      element: 'grafico',
      data: datos,
      xkey: 'nombre',
      ykeys: ['solicitados'],
      labels: ['Solicitados'],
      barColors: function (row, series, type) {
        return $arrColors[row.x];
    }
    });
  })
  .catch(error => console.error(error));