"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function StudentsProgressStatus() {
  const data = () => {
    return {
      labels: labels,
      datasets: [
        {
          label: "On Track",
          data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
          fill: true,
          borderColor: "deepskyblue",
          backgroundColor: "rgba(0, 191, 255, 0.3)",
          pointRadius: 2,
          lineTension: 0.4,
          borderWidth: 2,
        },
        {
          label: "Behind",
          data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
          fill: true,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.3)",
          pointRadius: 2,
          lineTension: 0.4,
          borderWidth: 2,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => value + "%",
          },
        },
      },
  
  };

  return (
    <div>
      <Line data={data()} options={options} />
    </div>
  );
}
