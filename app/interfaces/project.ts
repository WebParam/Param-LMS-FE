export interface IProjectAnalytics {
  numberOfStudents: number;
  numbetOfStudentsEmployed: number;
  numberOfStudentsUnemployed: number;
  numberOfStudentsWithDisabilities: number;
  numberOfStudentsByProvince: {
    overall: number[];
    females: number[];
    males: number[];
  };
  numberOfStudentsByGender: {
    overall: number[];
    females: number[];
    males: number[];
  };
  numberOfStudentsByEquityGroup: {
    overall: number[];
    females: number[];
    males: number[];
  };
  numberOfStudentsByNationality: {
    overall: number[];
    females: number[];
    males: number[];
  };
  numberOfStudentsByLanguage: number[];
  numberOfStudentsByDisability: {
    overall: number[];
    females: number[];
    males: number[];
  };
  courseApplicants: {
    id: string;
    userId: string;
    name: string;
    gender: string;
    race: string;
    disability: string;
    employmentStatus: string;
    province: string;
    status: number;
    surname: string;
  }[];
  numberOfStudentsBySocialEconomicStatus: {
    overall: number[];
    females: number[];
    males: number[];
  };
  ageRangeGenderDistribution: {
    maleCounts: number[];
    femaleCounts: number[];
  };
}
