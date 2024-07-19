

const listOfDocumentNames = [
 {
  _id: '66754b17c66474c142f6b9f6',
  name: 'Identity Document',
 },
 {
  _id: '66754b17c66474c142f6b9f6',
  name: 'CV',
 },
 {
  _id: '66754b17c66474c142f6b9f6',
  name: 'Qualification',
  },
 {
  _id: '66754b17c66474c142f6b9f6',
  name: 'Learning Agreement',
 },
 {
  _id:'66754b17c66474c142f6b9f6',
  name: 'contracts'
 },
 {
  _id:'66754b17c66474c142f6b9f6',
  name: 'other'
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