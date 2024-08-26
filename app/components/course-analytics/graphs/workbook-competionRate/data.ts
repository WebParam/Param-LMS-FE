export const barDescriptions = [
  { description: "Complete", color: "#008000" }, // Changed to hex code for green
  { description: "Incomplete", color: "#FF0000" }, // Changed to hex code for red
];

export const options = {
  labels: ["Complete", "Incomplete"], // Changed labels to match bar descriptions
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