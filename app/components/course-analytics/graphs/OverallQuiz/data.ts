export const quizAttemptData = {
  series: [{
    data: [10, 41, 35, 51, 49, 62, 40, 91, 48]
  }],
  options: {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
      },
      zoom: {
        enabled: false
      }
    },
    colors:['#800080'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      align: 'left'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  }
};