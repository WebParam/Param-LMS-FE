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


const labels = [
  "Gauteng",
  "Western Cape",
  "Eastern Cape",
  "Northern Cape",
  "Limpopo",
  "Mpumalanga",
  "KZN",
  "Free State",
  "North West",
];
export const barDescriptions = [
  {     description: "Average no. of students in Province",
    color: "rgb(82 121 249)" },
];

export const data = async (QuestionsAskedData: number[]): Promise<StudentProvincesData> => {
  "use server";
  const labels = [
    "Gauteng", 
    "Western Cape", 
    "Eastern Cape", 
    "Northern Cape", 
    "Limpopo", 
    "Mpumalanga", 
    "KZN", 
    "Free State", 
    "North West"
  ];

  return {
    labels,
    datasets: [
      {
        label: "No of Students in Provinces",
        data: QuestionsAskedData,
        backgroundColor: "rgb(82 121 249)",
        barPercentage: 0.3,
        borderRadius: 10,
      },
    ],
  };
};