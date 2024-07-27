export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export interface StudentProvincesData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    barPercentage: number;
    borderRadius: number;
  }[];
}

export const barDescriptions = [
  {     description: "Average no. of Student Citezinship",
    color: "rgb(82 121 249)" },
];

export const data = async (QuestionsAskedData: number[]): Promise<StudentProvincesData> => {
  const labels = ["South Africa", "Other", "Dual(SA Plus Other)", "Permanent Residence", "Unknown"];


  return {
    labels,
    datasets: [
      {
        label: "No of Students",
        data: QuestionsAskedData,
        backgroundColor: "rgb(82 121 249)",
        barPercentage: 0.3,
        borderRadius: 10,
      },
    ],
  };
};