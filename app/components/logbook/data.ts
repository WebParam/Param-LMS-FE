
const listOfDocumentNames = [
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'John Doe',
    randomCode: 'A1B2',
    courseName: 'Computer Science',
    placedAt: 'Google'
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Jane Smith',
    randomCode: 'C3D4',
    courseName: 'Mechanical Engineering',
    placedAt: 'Microsoft'
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Emily Johnson',
    randomCode: 'E5F6',
    courseName: 'Business Administration',
    placedAt: 'Amazon'
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Michael Brown',
    randomCode: 'G7H8',
    courseName: 'Electrical Engineering',
    placedAt: 'Facebook'
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'Sarah Lee',
    randomCode: 'I9J0',
    courseName: 'Civil Engineering',
    placedAt: 'Apple'
  },
  {
    _id: '66754b17c66474c142f6b9f6',
    name: 'David Davis',
    randomCode: 'K1L2',
    courseName: 'Information Technology',
    placedAt: 'Tesla'
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