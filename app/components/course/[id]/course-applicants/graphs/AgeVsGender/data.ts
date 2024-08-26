export const AgeVsGenderData = {
  series: [
    {
      name: 'Male',
      data: [10, 15, 20, 25, 30, 35, 40, 45, 50],
    },
    {
      name: 'Female',
      data: [8, 12, 18, 22, 28, 32, 38, 42, 48],
    },
  ],
  options: {
    chart: {
      type: 'bar' as 'bar', 
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        borderRadius: 10, // Added for a nice rounded edge
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#007bff', '#ff0000'], // Changed color to blue and red
    },
    xaxis: {
      categories: [
        '18-20',
        '21-23',
        '24-26',
        '27-29',
        '30-32',
        '33-35',
        '36-38',
        '39-41',
        '42-44',
      ],
    },
    yaxis: {
      title: {
        text: 'Number of Students',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val:any) {
          return `${val}`;
        },
      },
    },
  },
};
