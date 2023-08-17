
export interface ICourse{
  _id:string,
  title: string;
  description: string;
  sections: ISection[];
  createdDate: string,
  creatingUser: string,
  state:number
  }
  export interface ISection {
   id: string;
   title : string;
   courseId: string;
   order:number ;
   state:number,
   competency:string,
   modules: IModule[];
  }
  
  export interface IModule {
  id: string;
  title: string;
  description:string;
  sectionId:string;
  order:number,
  state: number;
  videos: IVideo[];
  createdDate:string;
  creatingUser:string;
  notes:string;
  points:number;
  
  }
  
    export interface IVideo {
  id: string;
  title: string;
  duration:string,
  moduleId: string,
  videoLink: string;
  type: number, 
  comments:VideoComment[]
  videoFile: File;
  }
  
  export interface Comment {
  message:string,
  creatingUser:string,
  dateCreated:string,
  id:string,
  } 
  export interface VideoComment extends Comment {
      VideoId:string,
  }
  
  export interface ICourseState {
   course:ICourse
  }
  
  // ## Define the initial state  
  const initialState: ICourseState = {
      course:{
      _id:"",
       title:"",
      description:"",
      sections:[] as ISection[],
      createdDate:"",
      creatingUser:"",
      state:0
      }as ICourse
  };
  
  
  export interface IUpdateCourseDetailState{
     
          title:string,
          description:string,
          state:number
     
  }
  
  export interface IUpdateSectionDetailState{
      payload:{    
          sectionId:string,   
          title : string;
          order:number ;
          state:number,
          competency:string
      },
      type:string
  }
  
  export interface IUpdateModuleDetailState{
      payload:{    
          sectionId:string, 
          moduleId:string,  
          title : string;
          order:number ;
          state:number,
          competency:string
      },
      type:string
  }
  