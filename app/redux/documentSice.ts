import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStore } from "../interfaces/store";
import { IDocument, IDocumentState, IUpdateDocumentDetailState } from "../interfaces/document";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const loogedInUser = cookies.get('param-lms-user');

const initialState: IDocumentState = {
    documents: [] as IDocument[],
};

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

export const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        setSelectedDocumentForEdit(state, action) {
            state.documents = action.payload;
        },
        
        createDocumentDetails(state, action: PayloadAction<IUpdateDocumentDetailState>) {
            const _action = action.payload;
            const newDocument = {
                creatingUser: loogedInUser?.id,
                createdDate: todayDate,
                modifyingUser: loogedInUser?.id,
                reference: _action.reference,
                title: _action.title,
                url: "gugg",
                file: _action.file,
                modifiedDate: todayDate,
                state: 0,
            };
  //   Object.entries(_documentsFromState[0]).map(([key, value]) => {
  //     formData.append(key, value);
  //     console.log("Appended key:", key, "with value:", value);
  //   });
            state.documents.push(newDocument);
        },

        updateDocumentDetail(state, action: PayloadAction<IUpdateDocumentDetailState>) {
            const _action = action.payload;
            const index = state.documents.findIndex(doc => doc.reference === _action.reference);
            if (index !== -1) {
                state.documents[index] = {
                    ...state.documents[index],
                    title: _action.title,
                    modifyingUser:loogedInUser?.id,
                    file: _action.file,
                };
            }
        },
    },
});

export const {
    setSelectedDocumentForEdit,
    createDocumentDetails,
    updateDocumentDetail,
} = documentSlice.actions;

export const getSelectedDocumentForEdit = (state: AppStore) => state.documents.documents;
export default documentSlice.reducer;