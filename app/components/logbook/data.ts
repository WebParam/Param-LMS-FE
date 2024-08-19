
const listOfDocumentNames = [
 {
  _id: '66754b17c66474c142f6b9f6',
  name: 'John Doe',
  randomCode: 'A1B2'
 },
 {
  _id: '66754b17c66474c142f6b9f6',
  name: 'Jane Smith',
  randomCode: 'C3D4'
 },
 {
  _id: '66754b17c66474c142f6b9f6',
  name: 'Emily Johnson',
  randomCode: 'E5F6'
 },
 {
  _id: '66754b17c66474c142f6b9f6',
  name: 'Michael Brown',
  randomCode: 'G7H8'
 },
 {
  _id:'66754b17c66474c142f6b9f6',
  name: 'Sarah Lee',
  randomCode: 'I9J0'
 },
 {
  _id:'66754b17c66474c142f6b9f6',
  name: 'David Davis',
  randomCode: 'K1L2'
 }
]

export type applicantDocuments = {
  _id: string;
  UserId: string;
  blobUrl: string;
  name: 'Identity Document' | 'CV' | 'Qualification' | 'Learning Agreement';
  Status: 'Pending Review' | 'Accepted' | 'Declined';
}



  
export default listOfDocumentNames;