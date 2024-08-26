import { faker } from "@faker-js/faker";

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      }
    },
  };
  
  const labels = ["AS1", "AS2", "AS3", "AS4", "AS5", "AS6", "AS7", "AS8", "AS9", "AS0"];

  export const barDescriptions = [
    { description: " Assesment mark (y) % / Assesment code (x)", color: "rgb(82 121 249)" },
  ];

  export const data = {
    labels,
    datasets: [
      {
        label: "Assessment Marks",
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        backgroundColor: "rgb(82 121 249)",
        barPercentage: 0.3,
        borderRadius: 10,
      }
    ],
  };
  