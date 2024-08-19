import { ChartData } from "chart.js";

export interface AgeRangeGenderDistribution {
  ageRange: string;
  maleCount: number;
  femaleCount: number;
}
// Options for the chart
export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

// Labels for the chart
const labels = [
  "18 - 20",
  "21 - 23",
  "24 - 26",
  "27 - 29",
  "30 - 32",
  "33 - 35",
];

// Descriptions for the chart
export const barDescriptions = [
  { description: "Male", color: "rgb(33, 138, 253)" },
  { description: "Female", color: "rgba(145, 21, 243, 0.3)" },
];

// Function to transform real data
export const transformData = (
  data: AgeRangeGenderDistribution[]
): ChartData<"bar"> => {
  const maleData = labels.map((label) => {
    const entry = data.find((item) => item.ageRange === label);
    return entry ? entry.maleCount : 0;
  });

  const femaleData = labels.map((label) => {
    const entry = data.find((item) => item.ageRange === label);
    return entry ? entry.femaleCount : 0;
  });

  return {
    labels,
    datasets: [
      {
        label: "Male",
        data: maleData,
        backgroundColor: "rgb(33, 138, 253)",
        barPercentage: 0.3,
        borderRadius: 10,
      },
      {
        label: "Female",
        data: femaleData,
        backgroundColor: "rgba(145, 21, 243, 0.3)",
        barPercentage: 0.3,
        borderRadius: 10,
      },
    ],
  };
};
