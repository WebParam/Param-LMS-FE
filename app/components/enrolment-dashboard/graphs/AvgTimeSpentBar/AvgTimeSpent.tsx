"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
);

const labels = ["Gauteng", "Western Cape", "Eastern Cape", "Northern Cape", "Limpopo", "Mpumalanga", "KZN", "Free State", "North West"];

export function AvgTimeSpent({ averageTimeSpent }:any) {
  const data = () => {
    return {
      labels: labels,
      datasets: [
        {
          label: "# of Students",
          data: averageTimeSpent,
          fill: "start",
          pointRadius: 2,
          lineTension: 0.4,
          borderWidth: 1,
          backgroundColor: (context:any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "rgb(33, 138, 253)");
            gradient.addColorStop(1, "rgba(145, 21, 243, 0.3)");
            return gradient;
          },
          borderColor: "rgba(75,192,192,1)",
          barPercentage: 0.3,
          borderRadius: 10,
        },
      ],
    };
  };

  const options:any = {
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
          callback: (value:any) => value + "hr",
        },
      },
    },
  };

  return <Bar options={options} data={data()} />;
}
