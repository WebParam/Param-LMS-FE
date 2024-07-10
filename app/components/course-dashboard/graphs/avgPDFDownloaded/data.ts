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
  { description: "PDFs downloaded over time", color: "rgb(82 121 249)" },
];

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const data = async ( PDFsChartBarData: number[] ) => {
"use server";
return {
  labels,
  datasets: [
    {
      label: "No of PDFs downloaded",
      data: PDFsChartBarData,
      backgroundColor: "rgb(82 121 249)",
      barPercentage: 0.3,
      borderRadius: 10,
    }
  ],
}
}
