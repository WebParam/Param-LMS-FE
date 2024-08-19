export interface IEnrollment{
    _id:string;
    userId:string;
    createdDate:string;
    creatingUser:string;
    modifiedDate:string;
    modifyingUser:string;
    courses:string[];
}

export interface IUpdateEnrollment {
    userId: string;
    status: number;
    fullName: string;
    email: string;
    courseTitle: string;
    rejectionReason?: string;
  }