export const barDescriptions = [
    { description: "Placed Students", color: "blue" },
    { description: "Not Placed Students", color: "orange" },
  ];
  
  export const options = {
    labels: ["Not Placed", "Placed"],
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

  export const series = [44, 55]; // Data for each category