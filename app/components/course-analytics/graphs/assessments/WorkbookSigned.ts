export const WorkbookSignedData = {
    series: [
      {
        name: 'SignedAssessment marks % (y) / Time (x)',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          borderRadius: 10, 
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff'],
      },
      xaxis: {
        categories: [
          'AS1',
          'AS2',
          'AS3',
          'AS4',
          'AS5',
          'AS6',
          'AS7',
          'AS8',
          'AS9',
      ],
      },
      yaxis: {
        title: {
          text: 'Assesment Mark (y) % / Assesment Code (x)',
        },
      },
      fill: {
        opacity: 1,
        colors: ['#007bff'], 
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val} hours`;
          },
        },
      },
    },
  };