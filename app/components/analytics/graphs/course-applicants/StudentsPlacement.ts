export const options = {
  labels: ["Placed", "Not Placed"], // Changed labels to match student placement data
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

export const series = [80, 20]; // Data for each student placement