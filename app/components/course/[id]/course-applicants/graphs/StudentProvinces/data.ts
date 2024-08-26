export const studentProvincesData = {
  series: [
    {
      name: 'Number of Students',
      data: [10, 12, 15, 18, 20, 22, 25, 28, 30],
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
        borderRadius: 10, // Added for a nice rounded edge
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#007bff'], // Changed color to a nice blue
    },
    xaxis: {
      categories: [
        'Gauteng',
        'KwaZulu-Natal',
        'Eastern Cape',
        'Western Cape',
        'Northern Cape',
        'Free State',
        'Mpumalanga',
        'Limpopo',
        'North West',
      ],
    },
    yaxis: {
      title: {
        text: 'Number of Students (in hundreds)',
      },
    },
    fill: {
      opacity: 1,
      colors: ['#007bff'], // Changed color to a nice blue
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