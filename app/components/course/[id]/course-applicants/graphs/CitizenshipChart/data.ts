import { faker } from "@faker-js/faker";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export const barDescriptions = [
  { description: "Citizenship of Students", color: "rgb(82 121 249)" },
];

const labels = ["South Africa", "Other", "Dual(SA Plus Other)", "Permanent Residence", "Unknown"];

export const data = {
  labels,
  datasets: [
    {
      label: "# of Students",
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      backgroundColor: "rgb(82 121 249)",
      barPercentage: 0.3,
      borderRadius: 10,
    }
  ],
};
