export const mockData = [
  {
    name: "John Doe",
    gender: "Male",
    homeLanguage: "English",
    race: "Caucasian",
    disability: "None",
    employmentStatus: "Employed",
    province: "Gauteng",
    status: 1,
    age: 34
  },
  {
    name: "Jane Smith",
    gender: "Female",
    homeLanguage: "Afrikaans",
    race: "Coloured",
    disability: "None",
    employmentStatus: "Unemployed",
    province: "Western Cape",
    status: 2,
    age: 29
  },
  {
    name: "Lerato Mokoena",
    gender: "Female",
    homeLanguage: "Sesotho",
    race: "Black",
    disability: "None",
    employmentStatus: "Student",
    province: "Free State",
    status: 1,
    age: 22
  },
  {
    name: "Mandla Ndlovu",
    gender: "Male",
    homeLanguage: "Zulu",
    race: "Black",
    disability: "Visual Impairment",
    employmentStatus: "Employed",
    province: "KwaZulu-Natal",
    status: 3,
    age: 40
  },
  {
    name: "Sarah Johnson",
    gender: "Female",
    homeLanguage: "English",
    race: "Asian",
    disability: "None",
    employmentStatus: "Employed",
    province: "Eastern Cape",
    status: 1,
    age: 28
  },
  {
    name: "Thabo Dlamini",
    gender: "Male",
    homeLanguage: "Zulu",
    race: "Black",
    disability: "None",
    employmentStatus: "Self-employed",
    province: "Mpumalanga",
    status: 2,
    age: 45
  },
  {
    name: "Maryam Patel",
    gender: "Female",
    homeLanguage: "Hindi",
    race: "Indian",
    disability: "Hearing Impairment",
    employmentStatus: "Employed",
    province: "KwaZulu-Natal",
    status: 0,
    age: 33
  },
  {
    name: "James Brown",
    gender: "Male",
    homeLanguage: "English",
    race: "Coloured",
    disability: "None",
    employmentStatus: "Retired",
    province: "Northern Cape",
    status: 0,
    age: 67
  },
  {
    name: "Zama Mkhize",
    gender: "Female",
    homeLanguage: "Xhosa",
    race: "Black",
    disability: "None",
    employmentStatus: "Unemployed",
    province: "Eastern Cape",
    status: 1,
    age: 26
  },
  {
    name: "David Green",
    gender: "Male",
    homeLanguage: "English",
    race: "Caucasian",
    disability: "None",
    employmentStatus: "Student",
    province: "Limpopo",
    status: 0,
    age: 21
  },
  {
    name: "Nkosi Molefe",
    gender: "Male",
    homeLanguage: "Tswana",
    race: "Black",
    disability: "None",
    employmentStatus: "Employed",
    province: "North West",
    status: 3,
    age: 39
  },
  {
    name: "Sibongile Sithole",
    gender: "Female",
    homeLanguage: "Xhosa",
    race: "Black",
    disability: "None",
    employmentStatus: "Self-employed",
    province: "Western Cape",
    status: 0,
    age: 31
  },
  {
    name: "Andile Mbatha",
    gender: "Male",
    homeLanguage: "Zulu",
    race: "Black",
    disability: "None",
    employmentStatus: "Employed",
    province: "KwaZulu-Natal",
    status: 2,
    age: 36
  },
  {
    name: "Ayesha Khan",
    gender: "Female",
    homeLanguage: "Urdu",
    race: "Indian",
    disability: "None",
    employmentStatus: "Unemployed",
    province: "Gauteng",
    status: 1,
    age: 25
  }
];


interface Person {
  id?: string;
  userId?: string;
  name: string;
  surname?: string;
  gender: string;
  homeLanguage: string;
  race: string;
  disability: string;
  employmentStatus: string;
  province: string;
  status: number;
  age: number;
}

export const provinces = [
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

export const genders = ["Male", "Female"];

export const races = [
  "Black African",
  "coloured",
  "indian",
  "white",
  "asian",
  "other",
  "notSpecified",
];

export const employmentStatuses = [
  "Employed",
  "Unemployed",
  "Home Maker",
  "Scholar",
  "Unemployed(Disabled)",
  "Employed(Disabled)",
  "Other",
  "Unspecified",
];

export const disabilities = [
  "deaf",
  "blind",
  "dumb",
  "physicallyDisabled",
  "intellectuallyDisabled",
  "multipleDisabilities",
];

export const homeLanguages = [
  "English",
  "Zulu",
  "Xhosa",
  "Afrikaans",
  "Sotho",
  "Tswana",
  "Venda",
  "Ndebele",
  "Swati",
  "Tsonga",
];

const data: Person[] = [
  {
    id: "1",
    userId: "u1",
    name: "John",
    surname: "Doe",
    gender: genders[0],
    homeLanguage: homeLanguages[0],
    race: races[0],
    disability: disabilities[0],
    employmentStatus: employmentStatuses[0],
    province: provinces[0],
    status: 1,
    age: 25,
  },
  {
    id: "2",
    userId: "u2",
    name: "Jane",
    surname: "Smith",
    gender: genders[1],
    homeLanguage: homeLanguages[1],
    race: races[1],
    disability: disabilities[1],
    employmentStatus: employmentStatuses[1],
    province: provinces[1],
    status: 2,
    age: 30,
  },
  {
    id: "3",
    userId: "u3",
    name: "Mike",
    surname: "Brown",
    gender: genders[0],
    homeLanguage: homeLanguages[2],
    race: races[2],
    disability: disabilities[2],
    employmentStatus: employmentStatuses[2],
    province: provinces[2],
    status: 1,
    age: 35,
  },
  {
    id: "4",
    userId: "u4",
    name: "Emily",
    surname: "White",
    gender: genders[1],
    homeLanguage: homeLanguages[3],
    race: races[3],
    disability: disabilities[3],
    employmentStatus: employmentStatuses[3],
    province: provinces[3],
    status: 2,
    age: 28,
  },
  {
    id: "5",
    userId: "u5",
    name: "Liam",
    surname: "Green",
    gender: genders[0],
    homeLanguage: homeLanguages[4],
    race: races[4],
    disability: disabilities[4],
    employmentStatus: employmentStatuses[4],
    province: provinces[4],
    status: 1,
    age: 22,
  },
  {
    id: "6",
    userId: "u6",
    name: "Olivia",
    surname: "Blue",
    gender: genders[1],
    homeLanguage: homeLanguages[5],
    race: races[5],
    disability: disabilities[5],
    employmentStatus: employmentStatuses[5],
    province: provinces[5],
    status: 2,
    age: 27,
  },
];

export default data;


export const sampleKnowledgeModules = [
  { date: '2022-01-01', assessment: '85%', name: 'Fundamentals of Occupational Health and Safety', credits: 9, achievement: 'Pass' },
  { date: '2022-01-15', assessment: '90%', name: 'Fundamentals of Communication', credits: 6, achievement: 'Pass' },
  // Add more modules as needed
];

export const samplePracticalSkillsModules = [
  { date: '2022-02-01', assessment: '75%', name: 'Represent the needs of employees', credits: 8, achievement: 'Pass' },
  { date: '2022-02-15', assessment: '80%', name: 'Inspect work places', credits: 4, achievement: 'Pass' },
  // Add more modules as needed
];

export const sampleWorkExperienceModules = [
  { date: '2022-03-01', signedOff: 'Yes', name: 'Exposure to the workplace examination processes', credits: 12, achievement: 'Pass' },
  { date: '2022-03-15', signedOff: 'Yes', name: 'Exposure to Occupational Risk Management processes', credits: 12, achievement: 'Pass' },
  // Add more modules as needed
];