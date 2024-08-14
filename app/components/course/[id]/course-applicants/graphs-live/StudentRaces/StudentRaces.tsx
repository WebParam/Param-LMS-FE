"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StudentRacesProps {
  studentRacesData: number[];
}

export function StudentRaces({ studentRacesData }: StudentRacesProps) {
  const data = {
    labels: [
      "black",
      "coloured",
      "indian",
      "white",
      "asian",
      "other",
      "notSpecified"
    ],
    datasets: [
      {
        label: "# of Students",
        data: studentRacesData,
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
  return <Pie data={data} />;
}

export const barDescriptions = [
  { description: "Black", color: "red" },
  { description: "White", color: "orange" },
  { description: "Indian", color: "yellow" },
  { description: "Coloured", color: "green" },
  { description: "Asian", color: "blue" },
  { description: "Other", color: "indigo" },
  { description: "Not Specified", color: "violet" },
];
