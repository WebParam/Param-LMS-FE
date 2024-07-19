"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "Black",
    "White",
    "Indian",
    "Coloured",
    "Asian",
    "Other",
    "Not Specified",
  ],
  datasets: [
    {
      label: "# of Students",
      data: [50, 19, 23, 12, 6, 45, 15],
      backgroundColor: [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "indigo",
        "violet",
      ],
      borderColor: [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "indigo",
        "violet",
      ],
      borderWidth: 1,
    },
  ],
};

export function StudentRaces() {
  return <Pie data={data} />;
}
