export interface IEnrollment{
    _id?:string;
    userId:string;
    createdDate:string;
    creatingUser:string;
    modifiedDate:string;
    modifyingUser:string;
    courses:string[];
    courseProgress: ICourseProgress[] 
    state?:number
}


export interface ICourseProgress
{
    courseId : string
      studentId :string
      progress : number 
     isCompleted : boolean
     watchedVideos : IVideoModel[]
}


export interface IVideoModel
{
    videoId :string
    videoLength : string
    timeSpent : string
}


export interface UpdateProgressRequestModel
  {
        enrollmentId : string 
        userId : string
        courseId: string 
        videoId: string 
        videoLength: string 
        timeSpent: string 
}