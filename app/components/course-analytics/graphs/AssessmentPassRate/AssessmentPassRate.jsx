"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Pass", "Fail"],
  datasets: [
    {
      label: "# Assessment Pass Rate",
      data: [12, 19],
      backgroundColor: ["red", "green"],
      borderColor: ["red", "green"],
      borderWidth: 1,
    },
  ],
};

export function AssessmentPassRate() {
  return <Pie data={data} />;
}