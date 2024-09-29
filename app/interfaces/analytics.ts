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
 
   export interface IStudentSectionAnalyticDetails{
    section: string,
    timeSpent:string,
    completionRate:string ,
    numberOfComments: string,
    pointsCollected: string
   }
 
export interface IStudentAssessmentAnalytic {
    assessmentName: string,
    timeSpent: string,
    attempts: string,
    results: string
}

export interface IStudentQuizAnalytics {
    quizName: string;
    timeSpent: string;
    attempts: string;
    results: string;
}

export interface IStudentSectionAverage{
    sectionName: string
    averageCompletionRate: number
    averageTimeSpent: number
    averagePoints: string
    activeStudents: string
    questionsLauched: string
    downloadedResources: string
    notes: string
}

export interface IStudentQuizAverage{
    quizName: string
    averageAttempts: number,
    averageResults: number
    averageTimeSpent: number
}

export interface IStudentAssessmentAverage{
    assessmentName: string
    averageAttempts: number,
    averageResults: number
    averageTimeSpent: number
}


export interface IVideoAnalytics {
    videoWatchGroupedCharts: number[];
    videoWatchGroupedStudentsTable: IVideoStudentTableAnalytics[]
}

interface IVideoStudentTableAnalytics {
    studentId: string;
    firstName: string;
    surname: string;
    numberOfVideosWatched: number;
    topicCompletedRate: number;
}