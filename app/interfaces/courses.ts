export interface Course {
    id: number;
    title: string;
    description: string;
    sections: Sections[];
    createdDate: string,
    creatingUser: string,
    state:number
  }
  
  export interface Module {
    id: number;
    title: string;
    sectionId:string;
    order:number,
    state: number;
    videos: Video[];
  }
  
  export interface Video {
    id: number;
    title: string;
    duration:string,
    moduleId: string,
    videoLink: string;
    type: number, 
    comments:VideoComment[]
    videoFile: File;
    state: number,
  }
  
  export interface Sections {
    id: number;
    title : string;
    courseId: string;
    order:number ;
    state:number,
    competency:string,
    modules: Module[];
  }

    
  export interface Comment {
   message:string,
   state: number,
   creatingUser:string,
   dateCreated:string,
   id:string,
  }
  
  
    
  export interface VideoComment extends Comment {
       VideoId:string,
   }
   