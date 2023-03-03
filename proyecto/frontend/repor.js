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

    new Morris.Bar({
      element: 'grafico',
      data: datos,
      xkey: 'nombre',
      ykeys: ['solicitados'],
      labels: ['Solicitados']
    });
  })
  .catch(error => console.error(error));