"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  labels: [
    "Black",
    "White",
    "Indian",
    "Coloured",
    "Asian",
    "Other",
    "Not Specified",
  ],
  legend: {
    position: "bottom",
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom',
      }
    }
  }]
};

export const series = [50, 19, 23, 12, 6, 45, 15];

