export interface ICourseLogbook {
  id: string;
  adminId: string;
  courseId: string;
  logBookFileUrl: string;
  dateCreated?: string;
  dateUpdated?: string;
}

export interface IStudentLogbook {
  id: string;
  studentId: string;
  courseId: string;
  logBookFileUrl: string;
  dateCreated?: string;
  dateUpdated?: string;
}
