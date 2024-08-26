export const AvdTimeSpentData = {
  series: [
    {
      name: 'Average Time Spent',
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
        text: 'Average Time Spent (in hours)',
      },
    },
    fill: {
      opacity: 1,
      colors: ['#007bff'], // Changed color to a nice blue
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