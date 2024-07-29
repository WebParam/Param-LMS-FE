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

export interface StudentProvincesData {
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
    description: "Average no. of students Languages",
    color: "rgb(82 121 249)",
  },
];

export const data = async (
  QuestionsAskedData: number[]
): Promise<StudentProvincesData> => {
  "use server";
  const labels = [
    "english",
    "afrikaans",
    "zulu",
    "xhosa",
    "tswana",
    "sotho",
    "venda",
    "tsonga",
    "swati",
    "ndebele",
    "signLanguage",
    "pedi",
  ];

  return {
    labels,
    datasets: [
      {
        label: "# of Languages",
        data: QuestionsAskedData,
        backgroundColor: "rgb(82 121 249)",
        barPercentage: 0.3,
        borderRadius: 10,
      },
    ],
  };
};
