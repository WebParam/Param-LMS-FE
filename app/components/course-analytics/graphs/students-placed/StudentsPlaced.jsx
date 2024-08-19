"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Not Placed", "Placed"],
  datasets: [
    {
      label: "# of Students Placed",
      data: [12, 19],
      backgroundColor: ["red", "green"],
      borderColor: ["red", "green"],
      borderWidth: 1,
    },
  ],
};

export function StudentsPlaced() {
  return <Pie data={data} />;
}
