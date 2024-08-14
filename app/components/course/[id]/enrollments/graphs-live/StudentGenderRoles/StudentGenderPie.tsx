"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function StudentGenderRoles({StudentRoles}:any) {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Males vs Females",
        data: StudentRoles,
        backgroundColor: ["red", "green"],
        borderColor: ["red", "green"],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
