export const citizenshipData = {
  series: [
    {
      name: 'Number of Students',
      data: [10, 12, 15, 18, 20],
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
        'South Africa',
        'Other',
        'Dual(SA Plus Other)',
        'Permanent Residence',
        'Unknown',
      ],
    },
    yaxis: {
      title: {
        text: 'Number of Students (in hundreds)',
      },
    },
    fill: {
      opacity: 1,
      colors: ['#007bff'], 
    },
    tooltip: {
      y: {
        formatter: function (val:any) {
          return `${val}00`;
        },
      },
    },
  },
};