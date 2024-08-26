export const options = {
  labels: ["Students on Track", "Students Behind"], // Changed labels to match bar descriptions
  legend: {
    position: "bottom" as "top" | "left" | "right" | "bottom",
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom' as "top" | "left" | "right" | "bottom",
      }
    }
  }]
};

export const series = [64, 36]; // Data for each category