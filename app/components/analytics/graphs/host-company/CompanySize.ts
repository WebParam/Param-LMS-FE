export const CompanySizeData = {
    series: [
      {
        name: 'Company Size',
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
          text: 'Company Size (in hundreds)',
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