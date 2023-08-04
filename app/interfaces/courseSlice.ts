import { createSlice } from "@reduxjs/toolkit";
import { AppStore } from "./store";
import {updateCourseDetail, updateModuleDetail, updateSectionDetail, updateVideoDetail } from "./reducerFunctions";


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
sectionId:string;
order:number,
state: number;
videos: IVideo[];

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
    payload:{
        title:string,
        description:string,
        state:number
    },
    type:string
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

// Add the missing IUpdateVideoDetailState interface
export interface IUpdateVideoDetailState {
    payload: {
      sectionId: string;
      moduleId: string;
      videoId: string;
      title: string;
      duration: string;
      videoLink: string;
      type: number;
      comments: VideoComment[];
      videoFile: File;
    };
    type: string;
  }
  
  
export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        //load entire course to state
        setCourse(state, action) {
            state.course = action.payload;
        },
        updateCourseDetail(state, action) {
            const newState = updateCourseDetail(state, action.payload);
            state.course = newState;
        },
      
        
        updateSectionDetailReducer(state, action) {
            const newState = updateSectionDetail(state.course, action.payload);
            state.course = newState;
        },

        updateModuleDetailReducer(state, action) {
            // Assuming action.payload is an object of type IUpdateModuleDetailState
            const newState = updateModuleDetail(state.course, action.payload);
            state.course = newState;
          },


          updateVideoDetailReducer(state, action) {
            // Assuming action.payload is an object of type IUpdateVideoDetailState
            const newState = updateVideoDetail(state.course, action.payload);
            state.course = newState;
          },

    }
});

export const { setCourse } = courseSlice.actions;
export const getPersonnel = (state: AppStore) => state.personnel;

export default courseSlice.reducer; 