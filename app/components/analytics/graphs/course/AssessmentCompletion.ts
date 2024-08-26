export const AssessmentCompletionData = {
  series: [
    {
      name: 'Completed',
      data: [3, 4, 4.5, 5, 4.9, 6, 7, 9.1, 12.5],
    },
    {
      name: 'Incomplete',
      data: [2, 3, 3.5, 4, 3.9, 5, 6, 8.1, 10.5],
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
        text: 'Assessments (in hundreds)',
      },
    },
    fill: {
      opacity: 1,
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
