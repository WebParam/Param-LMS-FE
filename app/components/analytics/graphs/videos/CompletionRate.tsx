export const options = {
    labels: ["Completed", "Incomplete"], // Changed labels to match gender data
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
  
  export const series = ({data}:any) => data; 