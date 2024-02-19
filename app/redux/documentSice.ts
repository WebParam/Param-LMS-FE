import { createSlice } from "@reduxjs/toolkit";
import { AppStore } from "../interfaces/store";
import { IDocumentState, IUpdateDocumentDetailState } from "../interfaces/document";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const loogedInUser = cookies.get('param-lms-user');
const generateUniqueId = () => {
    return Math.random().toString(36).substring(7);
};


const today = new Date();
const year = today.getFullYear();
let month: number | string = today.getMonth() + 1;
let day: number | string = today.getDate();

month = month < 10 ? `0${month}` : month;
day = day < 10 ? `0${day}` : day;

let todayDate = (`${year}-${month}-${day}`);



const initialState: IDocumentState = {
    document: {
        creatingUser: loogedInUser?.id,
        createdDate: todayDate,
        modifyingUser: loogedInUser?.id,
        reference: "",
        title: "",
        url: "",
        document:"",
        state: 0,

    } 
};




export const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        setSelectedDocumentForEdit(state, action) {
            state.document = action.payload;
        },
        
        createDocumentDetail(state, action) {

            const _action = action.payload as IUpdateDocumentDetailState
            const newState = {
                ...state.document,
                title: _action.title,
                modifyingUser: _action.modifyingUser,
                reference: _action.reference,
                url: _action.url,
                document: _action.document
            }
            state.document = newState;
        },
        // updateCourseFromDataBase(state, action) {
        //     const _action = action.payload as IUpdateCourse;
          
        //     const newState = {
        //       id: _action.id,
        //       title: _action.title,
        //       description: _action.description,
        //       sections: _action.sections,
        //       createdDate: _action.createdDate,
        //       creatingUser: _action.creatingUser,
        //       state: 0,
        //       logo: _action.logo,
        //       courseImage: _action.courseImage,
        //       bannerImage: _action.bannerImage,
        //       modifyingUser: _action.modifyingUser
        //     } as ICourse;
        //     state.course = newState;
          
        //   }
             
}
});

export const {
    setSelectedDocumentForEdit,
    createDocumentDetail, 
  } = documentSlice.actions;

export const getSelectedDocumentForEdit = (state: AppStore) => state.document;
export default documentSlice.reducer; 