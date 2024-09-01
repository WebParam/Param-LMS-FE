export const options = {
    labels: ["Male", "Female"], // Changed labels to match gender data
    legend: {
      position: "bottom",
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom',
        }
      }
    }]
  };
  
  export const series = [64, 36]; // Data for each gender