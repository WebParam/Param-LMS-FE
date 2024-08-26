import { faker } from "@faker-js/faker";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["Formative ", "Informative ", "Extended Formative", "Exntended Informative"];

export const barDescriptions = [
  { description: "Average Per Assessment Over Time", color: "rgb(145 21 243)" },
];

export const data = {
  labels: labels,
  datasets: [
    {
      label: "Average Per Assessment",
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: "rgb(145 21 243)",
      backgroundColor: "rgb(145 21 243)",
      pointRadius: 2,
      lineTension: 0.4,
      borderWidth: 3,
    },
  ],
};
