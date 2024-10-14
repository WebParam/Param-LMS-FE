export const barDescriptions = [
    { description: "Passed", color: "blue" },
    { description: "Fail", color: "orange" },
  ];
  
  export const options = {
    labels: ["Failed", "Passed"],
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

  export const series = [12, 88]; // Data for each category