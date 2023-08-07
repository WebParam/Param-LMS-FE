
export interface ICourse{
    _id?:string,
    title: string;
    description: string;
    sections: ISection[];
    createdDate: string;
    creatingUser: string;
    modifiedDate?:string;
    logo:string;
    bannerImage:string;
    courseImage:string;
    modifyingUser?:string;
    state:number
    }
    
    export interface ISection {
     id?: string;
     title : string;
     courseId: string;
     order:number;
     state:number,
     competency:string,
     createdDate: string;
     creatingUser: string;
     modifiedDate?:string;
     modifyingUser?:string;
     modules: IModule[];
    }
    
    export interface IModule {
    id?: string;
    title: string;
    description:string;
    notes:string;
    sectionId:string;
    order:number,
    state: number;
    createdDate: string;
    creatingUser: string;
    modifiedDate?:string;
    modifyingUser?:string;
    points:number;
    videos: IVideo[];
    
    }
    
      export interface IVideo {
    id?: string;
    title: string;
    duration:string,
    moduleId: string,
    order:number,
    state: number,
    videoLink?: string;
    type: number, 
    videoFile?: string;
    createdDate: string;
    creatingUser: string;
    modifiedDate?:string;
    modifyingUser?:string;
    thumbnailImage:string;
    length:string,
    format:string,
    size:string,
    }
   interface IComment {
    message:string,
    creatingUser: string;
    modifiedDate?:string;
    modifyingUser?:string;
    id:string,
    referenceId:string,
    type:number,
    state: number
    } 
    
    export interface IRating {
    rating:number,
    creatingUser: string;
    modifiedDate?:string;
    modifyingUser?:string;
    id:string,
    referenceId:string,
    type:number,
    state: number
    }
    

    export interface IdeleteSection {
        courseId:string,
        sectionId:string
    }

    export interface IdeleteModule {
        courseId:string,
        sectionId:string,
        ModuleId:string
    }

    
    export interface IdeleteVideo {
        courseId:string,
        sectionId:string,
        ModuleId:string,
        videoId:string
    }