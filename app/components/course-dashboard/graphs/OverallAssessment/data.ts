import { faker } from "@faker-js/faker";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const barDescriptions = [
  { description: "Assessment taken over time", color: "rgb(82 121 249)" },
];

export const data = {
  labels,
  datasets: [
    {
      label: "No of Assessments",
      data: labels.map(() => faker.number.int({ min: 0, max: 300 })),
      backgroundColor: "rgb(82 121 249)",
      barPercentage: 0.2,
      borderRadius: 10,
    },
  ],
};
