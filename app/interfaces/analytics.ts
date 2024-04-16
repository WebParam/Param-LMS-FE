import { IUser } from "./user"

export interface IActivity {
    id?: string
    UserId: string
    from?: string
    to?: string
    ActivityType: IActivityType
    Duration: number
    TargetId: string
}


export enum IActivityType {
    Login = 0,
    Logout = 1,
    VideoStart = 2,
    VideoEnd = 3,
    QuizStart = 4,
    QuizEnd = 5,
    AssessmentStart = 6,
    AssessmentEnd = 7
}


export interface IUserTimeState {
   time : {
    loginTime: number | null;
    logoutTime: number | null;
   }
  }

  export interface IStudentAnalyticDetails{
    studentId: string,
    studentName:string,
    completionRate:string ,
    timeSpentOnCourse: string,
    pointsCollected: string
   }
 
