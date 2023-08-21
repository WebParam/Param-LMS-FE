import { createSlice } from "@reduxjs/toolkit";

import { AppStore } from "./interfaces/store";
import { ICourse, ICourseState, IModule, ISection, IUpdateCourseDetailState, IUpdateModuleDetailState, IUpdateSectionDetailState, IVideo } from "./interfaces/courses";
import { useState } from "react";

const generateUniqueId = () => {
    return Math.random().toString(36).substring(7);
};




function sortSectionByOrder(a: ISection, b: ISection) {
    return a.order - b.order;
}

function sortModuleByOrder(a: IModule, b: IModule) {
    return a.order - b.order;
}

// ## Define the initial state  
const initialState: ICourseState = {
    course: {
        _id: generateUniqueId(),
        title: "",
        description: "",
        sections: [] as ISection[],
        createdDate: "04/09/2015",
        creatingUser: "admin",
        state: 0,
        logo: "logo.png",
        courseImage: "course_image.jpg",
        bannerImage: "banner_image.jpg",
        modifyingUser: "user-789"

    } as ICourse
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

            const _action = action.payload as IUpdateCourseDetailState;

            const newState = {
                ...state.course,
                description: _action.description,
                state: _action.state,
                title: _action.title
            } as ICourse;


            state.course = newState;
        },


        updateSectionDetail(state, action) {
            const _action = action.payload as IUpdateSectionDetailState;
            const targetSection = state.course.sections.filter(section => section.id == _action.sectionId)[0];
            const newSection = {
                ...targetSection,
                title: _action.title,
                order: action.payload.order,
                state: action.payload.state,
                competency: action.payload.competency,
                modules: action.payload.modules || [],
            };
            const existingSections = state.course.sections.filter(x => x.id != action.payload.sectionId);
            const newSections = [...existingSections, newSection];
            const sortedSections = newSections.sort(sortSectionByOrder);
            const newState = { ...state.course, sections: sortedSections };

            state.course = newState;


        },

        updateModuleDetail(state, action) {
            const { sectionId, moduleId, title, order, moduleState, description } = action.payload;

            const updatedSections = state.course.sections.map(section => {
                if (section.id === sectionId) {
                    const updatedModules = section.modules.map(module => {
                        if (module.id === moduleId) {
                            return { ...module, title, order, state: moduleState, description };
                        }
                        return module;
                    });

                    const updatedSection = { ...section, modules: updatedModules };
                    return updatedSection;
                }
                return section;
            });

            state.course.sections = updatedSections;
        },

        addSection(state, action) {
            const { sectionTitle, sectionOrder, sectionState, sectionCompetency } = action.payload;

            const newSection: ISection = {
                id: generateUniqueId(),
                title: sectionTitle,
                courseId: state.course._id,
                order: sectionOrder,
                state: sectionState,
                competency: sectionCompetency,
                modules: [],
            };

            state.course.sections.push(newSection);
        },

        addModuleToSection(state, action) {
            const { sectionId, moduleTitle, moduleOrder, moduleState, moduleDescription } = action.payload;

            const newModule: IModule = {
                id: generateUniqueId(),
                title: moduleTitle,
                order: moduleOrder,
                state: moduleState,
                description: moduleDescription,
                videos: [],
                sectionId: sectionId,
                createdDate: "04/09/2015",
                creatingUser: "admin",
                notes: "",
                points: 0,
            };

            const section = state.course.sections.find(section => section.id === sectionId);
            if (section) {
                section.modules.push(newModule);
            }
        },

        addVideoToModule(state, action) {
            const { moduleId, videoTitle, videoLink, videoType, } = action.payload;

            const newVideo: IVideo = {
                id: generateUniqueId(),
                title: videoTitle,
                moduleId: moduleId,
                videoLink: videoLink,
                type: videoType,

            };

            const section = state.course.sections.find(section => section.modules.some(module => module.id === moduleId));
            if (section) {
                section.modules.forEach(module => {
                    if (module.id === moduleId) {
                        module.videos.push(newVideo);
                    }
                });
            }
        },
    },





}
);

export const { setSelectedCourseForEdit, updateCourseDetail, updateSectionDetail, updateModuleDetail, addSection, addModuleToSection, addVideoToModule } = courseSlice.actions;
export const getSelectedCourseForEdit = (state: AppStore) => state.course;

export default courseSlice.reducer; 