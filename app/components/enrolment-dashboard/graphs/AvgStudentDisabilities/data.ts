export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export interface StudentStatusData {
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
  { description: "No. of Student Disabilities", color: "rgb(82 121 249)" },
];

export const data = async (QuestionsAskedData: number[]): Promise<StudentStatusData> => {
    "use server";
    const labels = [
        "deaf",
        "blind",
        "dumb",
        "physicallyDisabled",
        "intellectuallyDisabled",
        "multipleDisabilities"
      ];
      
  
    return {
      labels,
      datasets: [
        {
          label: "Students Disabilities",
          data: QuestionsAskedData,
          backgroundColor: "rgb(82 121 249)",
          barPercentage: 0.3,
          borderRadius: 10,
        },
      ],
    };
  };