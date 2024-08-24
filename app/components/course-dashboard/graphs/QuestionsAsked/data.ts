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
  { description: "Questions asked over time", color: "rgb(82 121 249)" },
];

export const data = async (QuestionsAskedData: number[]) => {
  return {
    labels,
    datasets: [
      {
        label: "No of Questions Asked",
        data: QuestionsAskedData,
        backgroundColor: "rgb(82 121 249)",
        barPercentage: 0.3,
        borderRadius: 10,
      },
    ],
  };
};
