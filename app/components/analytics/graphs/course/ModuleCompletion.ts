export const ModuleCompletionRates = {
    series: [
      {
        name: 'Module A',
        data: [21, 32, 43, 54, 65, 76, 87, 98, 100],
      },
      {
        name: 'Module B',
        data: [11, 22, 33, 44, 55, 66, 77, 88, 99],
      },
      {
        name: 'Module C',
        data: [6, 16, 26, 36, 46, 56, 66, 76, 96],
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        area: {
          fill: 'monotone',
          connectNulls: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
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
          text: 'Cumulative Completion Rate (%)',
        },
        min: 0,
        max: 100,
      },
      fill: {
        opacity: 0.5,
        colors: ['#007bff', '#00cc00', '#ff0000'], // Colors for each module
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return `${val}%`;
          },
        },
      },
    },
  };