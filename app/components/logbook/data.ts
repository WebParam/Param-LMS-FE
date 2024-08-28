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
    name: 'John Doe',
    randomCode: 'A1B2',
    courseName: 'Computer Science',
    placedAt: 'Google',
    placedDate: '2024-01-01',
    jobRole: 'Software Developer',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Jane Smith',
    randomCode: 'C3D4',
    courseName: 'Mechanical Engineering',
    placedAt: 'Microsoft',
    placedDate: '2024-02-01',
    jobRole: 'Data Analyst',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Emily Johnson',
    randomCode: 'E5F6',
    courseName: 'Business Administration',
    placedAt: 'Amazon',
    placedDate: '2024-03-01',
    jobRole: 'Project Manager',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Michael Brown',
    randomCode: 'G7H8',
    courseName: 'Electrical Engineering',
    placedAt: 'Facebook',
    placedDate: '2024-04-01',
    jobRole: 'Sales Representative',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Sarah Lee',
    randomCode: 'I9J0',
    courseName: 'Civil Engineering',
    placedAt: 'Apple',
    placedDate: '2024-05-01',
    jobRole: 'HR Manager',
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'David Davis',
    randomCode: 'K1L2',
    courseName: 'Information Technology',
    placedAt: 'Tesla',
    placedDate: '2024-06-01',
    jobRole: 'Software Developer',
  }
];

export type applicantDocuments = {
  _id: string;
  UserId: string;
  blobUrl: string;
  name: 'Identity Document' | 'CV' | 'Qualification' | 'Learning Agreement';
  Status: 'Pending Review' | 'Accepted' | 'Declined';
}

export default listOfDocumentNames;