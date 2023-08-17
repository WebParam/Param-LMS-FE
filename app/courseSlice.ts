import { createSlice } from "@reduxjs/toolkit";
import { AppStore } from "./interfaces/store";
import { ICourse, ICourseState, IModule, ISection, IUpdateCourseDetailState, IUpdateModuleDetailState, IUpdateSectionDetailState } from "./interfaces/courses";




function sortSectionByOrder(a:ISection, b:ISection) {
    return a.order - b.order;
}
  
function sortModuleByOrder(a:IModule, b:IModule) {
    return a.order - b.order;
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
  
export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        //load entire course to state
        setSelectedCourseForEdit(state, action) {
            state.course = action.payload;
        },
        //
        updateCourseDetail(state, action) {
            console.log("courssase", action)
           const _action = action.payload as IUpdateCourseDetailState;
           console.log("course", _action)
            const newState = {
                ...state.course,
                description : _action.description,
                state : _action.state,
                title : _action.title
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

export const { setSelectedCourseForEdit, updateCourseDetail } = courseSlice.actions;
export const getSelectedCourseForEdit = (state: AppStore) => state.course;

export default courseSlice.reducer; 