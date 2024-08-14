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

const labels = ["18 - 20","21 - 23", "24 - 26", "27- 29", "30 - 32","33 - 35"];

export const barDescriptions = [
  { description: "Male", color: "rgb(33, 138, 253)" },
  { description: "Female", color: "rgba(145, 21, 243, 0.3)" },
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Male',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      backgroundColor: "rgb(33, 138, 253)",
      barPercentage: 0.3,
      borderRadius: 10,
    },
    {
      label: 'Female',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(145, 21, 243, 0.3)",
      barPercentage: 0.3,
      borderRadius: 10,
    }
  ],
};