import { faker } from "@faker-js/faker";

export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const barDescriptions = [
  { description: "Completed Assessment", color: "rgb(33, 138, 253)" },
  { description: "Pending Assessment", color: "rgba(145, 21, 243, 0.3)" },
];

export const data = async ({ pending, completed }: { pending: number[];  completed: number[]}) => {
  // "use server";

  return {
    labels,
    datasets: [
      {
        label: "Completed",
        data: completed,
        backgroundColor: "rgb(33, 138, 253)",
        barPercentage: 0.3,
        borderRadius: 10,
      },
      {
        label: "Pending",
        data: pending,
        backgroundColor: "rgba(145, 21, 243, 0.3)",
        barPercentage: 0.3,
        borderRadius: 10,
      },
    ],
  };
};
