export interface IClassSession {
  id?: string;
  sessionType: number;
  classLink: string;
  date: string;
  title: string;
  courseId: string;
  moduleId: string;
  classDuration: string;
  startingTime: string;
  adminId: string;
  location: string;
  state?: number,
  createdAt?: string,
  modifiedAt?: string
}

