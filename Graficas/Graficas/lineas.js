new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'myfirstchart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: [
      { year: '2008', value: 20, value2: 30 },
      { year: '2009', value: 10, value2: 40 },
      { year: '2010', value: 5, value2: 10 },
      { year: '2011', value: 5, value2: 5 },
      { year: '2012', value: 30, value2: 20 },
      { year: '2013', value: 45, value2: 21 }      
    ],
    // The name of the data record attribute that contains x-values.
    xkey: 'year',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value', 'value2'],
    lineWidth: 1,
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Coca Cola', 'Pepsi'],
    resize: true,
    lineColors: ['#FF5733','#800080']
  });