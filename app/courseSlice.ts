import { createSlice } from "@reduxjs/toolkit";
import { AppStore } from "./store";
import { IPersonnel } from "./interfaces/personnel";

interface ICourse{
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


function sortSectionByOrder(a:ISection, b:ISection) {
    return a.order - b.order;
}
  
function sortModuleByOrder(a:IModule, b:IModule) {
    return a.order - b.order;
}
  
export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        //load entire course to state
        setCourse(state, action) {
            state.course = action.payload;
        },
        //
        updateCourseDetail(state, action:IUpdateCourseDetailState) {
            const newState = {
                ...state.course,
                description : action.payload.description,
                state : action.payload.state,
                title : action.payload.title
            } as ICourse;
           
            state.course = newState;
        },

     
        updateSectionDetail(state,action:IUpdateSectionDetailState){
            const targetSection = state.course.sections.filter(section=>section.id == action.payload.sectionId)[0];
            const newSection = {...targetSection, title:action.payload.title, order:action.payload.order,state:action.payload.state, competency:action.payload.competency};
            const existingSections = state.course.sections.filter(x=>x.id!=action.payload.sectionId);
            const newSections =[...existingSections, newSection];
            const sortedSections = newSections.sort(sortSectionByOrder);
            const newState = {...state.course, sections:sortedSections};
      
            state.course =  newState;

            
        },
        updateModuleDetail(state,action:IUpdateModuleDetailState){
            //find module
            const targetSection = state.course.sections.filter(section=>section.id == action.payload.sectionId)[0];
            const targetModule = targetSection.modules.filter(module=>module.id == action.payload.moduleId)[0];
            //update module
            const newModule={...targetModule, title:action.payload.title, order:action.payload.order, state:action.payload.state};
            //update module array (remove old module)
            const existingModules =  targetSection.modules.filter(module=>module.id!= action.payload.moduleId);
            //add updated module to array
            const newModules = [...existingModules,newModule];
            //sort module array
            const sortedModules = newModules.sort(sortModuleByOrder);
            //create new section
            const newSection = {...targetSection, modules:sortedModules} as ISection;
            //remove old section
            const existingSections = state.course.sections.filter(x=>x.id!=action.payload.sectionId);
            //add updated section to array
            const newSections =[...existingSections, newSection];
            //sort sections
            const sortedSections = newSections.sort(sortSectionByOrder);
            //update state
            const newState = {...state.course, sections:sortedSections};      
            state.course =  newState;

            
        }

    }
});

export const { setCourse } = courseSlice.actions;
export const getPersonnel = (state: AppStore) => state.personnel;

export default courseSlice.reducer; 