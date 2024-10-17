export const AgeVsGenderData = ({malesData, femalesData}:any) => ({
  series: [
    {
      name: 'Male',
      data: malesData,
    },
    {
      name: 'Female',
      data: femalesData,
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true, // Enable stacking to show both genders in the same bar
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
      show: false,
      width: 2,
      colors: ['#ff0000', '#ff0000'],
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
});
