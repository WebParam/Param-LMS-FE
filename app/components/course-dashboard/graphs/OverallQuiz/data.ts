
import { faker } from "@faker-js/faker";


export const options = {  
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const barDescriptions = [
  { description: "Quizzes completed overtime", color: "rgb(145 21 243)" },
];




export const data = {
  labels,
  datasets: [
    {
      label: "Average Quizzes Completed",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgb(33, 138, 253)",
      barPercentage: 0.3,
      borderRadius: 10,
    },
   
  ],
};
