export const dateRanges = [
  "A Month Ago",
  "3 Months Ago",
  "6 Months Ago",
  "A Year Ago",
];

export const jobRoles = [
  "Software Developer",
  "Data Analyst",
  "Project Manager",
  "Sales Representative",
  "HR Manager",
];

export const courseNames = [
  "Computer Science",
  "Mechanical Engineering",
  "Business Administration",
  "Electrical Engineering",
  "Civil Engineering",
  "Information Technology",
];

export const placedAt = [
  "Google",
  "Microsoft",
  "Amazon",
  "Facebook",
  "Apple",
  "Tesla",
];
const listOfDocumentNames = [
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Mondli Khumalo',
    randomCode: 'A1B2',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-01-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Lindokuhle Xaba',
    randomCode: 'C3D4',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-02-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Siboniso Sibiya',
    randomCode: 'E5F6',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-03-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Tinny Mandisa Phala',
    randomCode: 'G7H8',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-04-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Kgothatso Utonga Khumalo',
    randomCode: 'I9J0',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-05-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Shanique Plaatjies',
    randomCode: 'K1L2',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-06-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Elnah Nkosingiphile Mthethwa',
    randomCode: 'M3N4',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-07-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Kaylee Alexandra Govender',
    randomCode: 'O5P6',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-08-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Kirlynne Felix',
    randomCode: 'Q7R8',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-09-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Lerato Blessing Phema',
    randomCode: 'S9T0',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-10-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Bongeka Msibi',
    randomCode: 'U1V2',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-11-01',
    jobRole: '',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Mokgadi Madutung',
    randomCode: 'W3X4',
    courseName: 'Management Accounting',
    placedAt: '',
    placedDate: '2024-12-01',
    jobRole: '',
  },
];


export type applicantDocuments = {
  _id: string;
  UserId: string;
  blobUrl: string;
  name: 'Identity Document' | 'CV' | 'Qualification' | 'Learning Agreement';
  Status: 'Pending Review' | 'Accepted' | 'Declined';
}

export default listOfDocumentNames;
