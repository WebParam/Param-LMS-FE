"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function StudentsProgressStatus({studentCourseProgress}) {
  const data = {
    labels: ["Behind", "On Track"],
    datasets: [
      {
        label: "# of Progress Status",
        data: studentCourseProgress,
        backgroundColor: ["red", "green"],
        borderColor: ["red", "green"],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
