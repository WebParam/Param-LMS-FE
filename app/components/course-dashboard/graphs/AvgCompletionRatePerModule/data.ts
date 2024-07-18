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
  { description: "Completion Rate over time", color: "rgb(82 121 249)" },
];

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const data = async ( CompletionRateChartBarData: number[] ) => {
"use server";
return {
  labels,
  datasets: [
    {
      label: "Completion Rate",
      data: CompletionRateChartBarData,
      backgroundColor: "rgb(82 121 249)",
      barPercentage: 0.3,
      borderRadius: 10,
    }
  ],
}
}
