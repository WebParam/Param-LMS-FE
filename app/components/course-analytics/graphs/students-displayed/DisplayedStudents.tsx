"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GanttChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}

export default function GanttChart({ data }: GanttChartProps) {
  const options: ChartOptions<"bar"> = {
    indexAxis: 'y' as const,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Months'
        }
      }
    },
    plugins: {
      title: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.x}`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return <Bar data={data} options={options} />;
}