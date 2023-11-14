import { createSlice } from "@reduxjs/toolkit";

import { AppStore } from "./interfaces/store";
import { ICourse, ICourseState, IModule, ISection, IUpdateCourse, IUpdateCourseDetailState, IUpdateModuleDetailState, IUpdateSectionDetailState, IVideo } from "./interfaces/courses";
import { useState } from "react";


// ## Define the initial state  
const initialState: ICourseState = {
    course: {
        _id: "",
        title: "",
        description: "",
        sections: [] as ISection[],
        createdDate: "04/09/2015",
        creatingUser: "",
        state: 0,
        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/640px-Python-logo-notext.svg.png",
        courseImage: "course_image.jpg",
        bannerImage: "banner_image.jpg",
        modifyingUser: "user-789"

    } as ICourse
};

export const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        //load entire course to state
        setSelectedCourse(state, action) {
            state.course = action.payload;
            localStorage.setItem("course", JSON.stringify(action.payload));
        
        }}
}
);


export const {
    setSelectedCourse
  } = viewCourseSlice.actions;

export const getSelectedCourse = (state: AppStore) => {
  debugger;
    state.course=JSON.parse(localStorage.getItem("course")as any) || null ;
    console.log("State",state.course);
    return state;
};
   
     
    

export default viewCourseSlice.reducer; 