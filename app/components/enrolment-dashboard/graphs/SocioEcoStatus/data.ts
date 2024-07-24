import { faker } from "@faker-js/faker";

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
  { description: "Socio Economic Status of Students", color: "rgb(82 121 249)" },
];

export const data = async (QuestionsAskedData: number[]): Promise<StudentStatusData> => {
    "use server";
    const labels = [
        "Employed",
        "Unemployed",
        "Home Maker",
        "Scholar",
        "Unemployed(Disabled)",
        "Employed(Disabled)",
        "Other",
        "Unspecified",
      ];
      
  
    return {
      labels,
      datasets: [
        {
          label: "Students Socio Economic Status ",
          data: QuestionsAskedData,
          backgroundColor: "rgb(82 121 249)",
          barPercentage: 0.3,
          borderRadius: 10,
        },
      ],
    };
  };