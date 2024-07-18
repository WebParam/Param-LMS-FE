import { faker } from "@faker-js/faker";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const barDescriptions = [
  { description: "Quizzes completed overtime", color: "rgb(145 21 243)" },
];

export const data = async ( quizAttempts: number[] ) => {
  "use server";
  return {
    labels: labels,
    datasets: [
      {
        label: "Average Quizzes Completed",
        data: quizAttempts,
        borderColor: "rgb(145 21 243)",
        backgroundColor: "rgb(145 21 243)",
        pointRadius: 2,
        lineTension: 0.4,
        borderWidth: 3,
      },
    ],
  };
};
