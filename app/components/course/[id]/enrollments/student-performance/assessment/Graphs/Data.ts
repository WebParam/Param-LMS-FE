import { faker } from "@faker-js/faker";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

export interface StudentStatusData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    barPercentage: number;
    borderRadius: number;
  }[];
}

export const barDescriptions = [
  {
    description: "Socio Economic Status of Students",
    color: "rgb(82 121 249)",
  },
];

export const data = (): StudentStatusData => {
  const labels = [
    "Employed",
    "Unemployed",
    "Home Maker",
    "Scholar",
    "Unemployed(Disabled)",
    "Employed(Disabled)",
    "Other",
    "Unspecified",
  ];

  // Mocking data using faker
  const QuestionsAskedData = labels.map(() =>
    faker.datatype.number({ min: 0, max: 100 })
  );

  return {
    labels,
    datasets: [
      {
        label: "Students Socio Economic Status",
        data: QuestionsAskedData,
        backgroundColor: "rgb(82 121 249)",
        barPercentage: 0.3,
        borderRadius: 10,
      },
    ],
  };
};
