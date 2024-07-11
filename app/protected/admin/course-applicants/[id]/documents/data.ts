

const list: applicantDocuments[] = [
 {
  _id: '66754b17c66474c142f6b9f6',
  UserId: '656f1335650c740ce0ae4d65',
  blobUrl:'id_document.pdf',
  name: 'Identity Document',
  Status: 'Pending Review',
 },
 {
  _id: '66754b17c66474c142f6b9f6',
  UserId: '656f1335650c740ce0ae4d65',
  blobUrl:'cv.pdf',
  name: 'CV',
  Status: 'Pending Review',
 },
 {
  _id: '66754b17c66474c142f6b9f6',
  UserId: '656f1335650c740ce0ae4d65',
  blobUrl:'qualification.pdf',
  name: 'Qualification',
  Status: 'Pending Review',
 },
 {
  _id: '66754b17c66474c142f6b9f6',
  UserId: '656f1335650c740ce0ae4d65',
  blobUrl:'learning_agreement.pdf',
  name: 'Learning Agreement',
  Status: 'Pending Review',
 }
]

export type applicantDocuments = {
  _id: string;
  UserId: string;
  blobUrl: string;
  name: 'Identity Document' | 'CV' | 'Qualification' | 'Learning Agreement';
  Status: 'Pending Review' | 'Accepted' | 'Declined';
}



  
export default list;