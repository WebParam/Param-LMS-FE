import { createSlice } from "@reduxjs/toolkit";
import {IQuiz,IChoice,IQuestion} from "../interfaces/quiz"

const generateUniqueId = () => {
    return 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        return (Math.random() * 16 | 0).toString(16);
    });
};

export const initialState: IQuiz = {
    id: "",
    questions: [
      {
        id: generateUniqueId(),
        text: "",
        choices: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ],
    reference: "",
    createdByUserId: "",
    modifiedByUserId: "",
    createdDate: "",
    modifiedDate: "",
  };

  export const quizSlice = createSlice({
    name:"Quiz",
    initialState,
    reducers:{
        createQuiz(state,action){
            return action.payload;
        },

        createQuestion(state,action){
            state.questions.push(action.payload);
        },

        createChoice(state,action){
            const { questionId, choice } = action.payload;
            const question = state.questions.find(q => q.id === questionId);
            if (question) {
              question.choices.push(choice);
            }
        },

        getQuiz(state){
            return state;
        },
    }
  })

  export const {
    createQuiz,createQuestion,createChoice,getQuiz
  }=quizSlice.actions;

  export default quizSlice.reducer;