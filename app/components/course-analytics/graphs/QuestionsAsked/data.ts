export const questionAskedData = {
  series: [
    {
      name: 'Questions Asked',
      data: [3, 4, 4.5, 5, 4.9, 6, 7, 9.1, 12.5],
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
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    yaxis: {
      title: {
        text: 'Questions Asked (in hundreds)',
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