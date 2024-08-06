export type CourseApplicants = {
  id?:string;
  userId?:string;
  name: string;
  surname?:string
  gender: string;
  homeLanguage: string;
  race: string;
  disability: string;
  employmentStatus: string;
  province: string;
  status: number;
  age:number;
};

export interface AgeRangeGenderDistribution {
  ageRange: string;
  maleCount: number;
  femaleCount: number;
}
export interface IStudentsData {
  numberOfStudents: number;
  numbetOfStudentsEmployed: number;
  numberOfStudentsUnemployed: number;
  numberOfStudentsWithDisabilities: number;
  numberOfStudentsByProvince: {
    easternCape: number;
    freeState: number;
    gauteng: number;
    kwaZuluNatal: number;
    limpopo: number;
    mpumalanga: number;
    northWest: number;
    northernCape: number;
    westernCape: number;
  };
  numberOfStudentsByGender: {
    male: number;
    female: number;
  };
  numberOfStudentsByEquityGroup: {
    black: number;
    coloured: number;
    indian: number;
    white: number;
    asian: number;
    other: number;
    notSpecified: number;
  };
  numberOfStudentsByNationality: {
    southAfrican: number;
    dual: number;
    others: number;
    pernamentResident: number;
    unknown: number;
  };
  numberOfStudentsByLanguage: {
    english: number;
    afrikaans: number;
    zulu: number;
    xhosa: number;
    tswana: number;
    sotho: number;
    venda: number;
    tsonga: number;
    swati: number;
    ndebele: number;
    signLanguage: number;
    pedi: number;
  };
  numberOfStudentsByDisability: {
    deaf: number;
    blind: number;
    dumb: number;
    physicallyDisabled: number;
    intellectuallyDisabled: number;
    multipleDisabilities: number;
  };
  ageRangeGenderDistribution:AgeRangeGenderDistribution[]
  courseApplicants: CourseApplicants[];
}