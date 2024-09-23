export const barDescriptions = [
    { description: "Complete", color: "#008000" }, 
    { description: "Incomplete", color: "#FF0000" }, 
  ];
  
  export const options = {
    labels: ["Complete", "Incomplete"], 
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
  
  export const series = [64, 36]; 