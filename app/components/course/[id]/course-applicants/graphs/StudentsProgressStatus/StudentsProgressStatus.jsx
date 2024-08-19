"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Male", "Female"],
  datasets: [
    {
      label: "# of Students",
      data: [12, 19],
      backgroundColor: ["blue", "green"],
      borderColor: ["blue", "green"],
      borderWidth: 1,
    },
  ],
};

export function StudentsProgressStatus() {
  return <Pie data={data} />;
}
