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
        logo: "data:image/png;base64,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",
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
             
                competency: action.payload.competency,
            };
            const existingSections = state.course.sections.filter(x => x.id != action.payload.sectionId);
            const newSections = [...existingSections, newSection];
            const sortedSections = newSections.sort(sortSectionByOrder);
            const newState = { ...state.course, sections: sortedSections };

            state.course = newState;


        },
        deleteSection(state, action) {
            const sectionIdToDelete = action.payload;

            const updatedSections = state.course.sections.filter(section => section.id !== sectionIdToDelete);

            state.course.sections = updatedSections;
        },
        updateModuleDetail(state, action) {
            const { sectionId, moduleId, title, description } = action.payload;

            const updatedSections = state.course.sections.map(section => {
                if (section.id === sectionId) {
                    const updatedModules = section.modules.map(module => {
                        if (module.id === moduleId) {
                            return { ...module, title,  description };
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
            const { sectionTitle,  sectionCompetency } = action.payload;

            const newSection: ISection = {
                id: generateUniqueId(),
                title: sectionTitle,
                courseId: state.course._id,
                order: 1,
                state: 0,
                competency: sectionCompetency,
                createdDate: "2023-08-07T11:28:14.632Z",
                creatingUser: "user-456",
                modifiedDate: "2023-08-07T11:28:14.632Z",
                modifyingUser: "user-789",
                modules: [],
            };

            state.course.sections.push(newSection);
        },

        addModuleToSection(state, action) {
            const { sectionId, moduleTitle,  moduleDescription } = action.payload;

            const newModule: IModule = {
                id: generateUniqueId(),
                title: moduleTitle,
                description: moduleDescription,
                notes: "These are some additional notes for Module 1.",
                creatingUser: "user-456",
                creatingDate: "2023-08-07T11:28:14.632Z",
                modifyingUser: "user-789",
                modifiedDate: "2023-08-07T11:28:14.632Z",
                sectionId: sectionId,
                order: 1,
                state: 0,
                videos: [],
                
            };

            const section = state.course.sections.find(section => section.id === sectionId);
            if (section) {
                section.modules.push(newModule);
            }
        },
        deleteModuleFromSection(state, action) {
            const { sectionId, moduleId } = action.payload;
      
            const updatedSections = state.course.sections.map(section => {
              if (section.id === sectionId) {
                const updatedModules = section.modules.filter(module => module.id !== moduleId);
                return { ...section, modules: updatedModules };
              }
              return section;
            });
      
            state.course.sections = updatedSections;
          },
        deleteVideoFromModule(state, action) {
            const { moduleId, videoId } = action.payload;
      
            const updatedSections = state.course.sections.map(section => {
              const updatedModules = section.modules.map(module => {
                if (module.id === moduleId) {
                  const updatedVideos = module.videos.filter(video => video.id !== videoId);
                  return { ...module, videos: updatedVideos };
                }
                return module;
              });
      
              return { ...section, modules: updatedModules };
            });
      
            state.course.sections = updatedSections;
          },

        addVideoToModule(state, action) {
            const { moduleId, videoTitle, videoLink,  } = action.payload;

            const newVideo: IVideo = {
                id: generateUniqueId(),
                title: videoTitle,
                duration: "5:30",
                moduleId: "module-101",
                order: 1,
                state: 0,
                videoLink: videoLink,
                type: 0,
                videoFile: "video-201.mp4",
                createdDate: "2023-08-07T11:28:14.632Z",
                creatingUser: "user-456",
                modifiedDate: "2023-08-07T11:28:14.632Z",
                modifyingUser: "user-789",
                thumbnailImage: "thumbnail-201.jpg",
                length: "5 minutes",
                format: "mp4",
                size: "50 MB"
  

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



  export const {
    setSelectedCourseForEdit,
    updateCourseDetail,
    updateSectionDetail,
    updateModuleDetail,
    addSection,
    deleteSection,
    addModuleToSection,
    addVideoToModule,
    deleteModuleFromSection,
    deleteVideoFromModule // Add this line
  } = courseSlice.actions;
  export const getSelectedCourseForEdit = (state: AppStore) => state.course;

export default courseSlice.reducer; 