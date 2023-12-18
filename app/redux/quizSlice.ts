import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD:app/quizSlice.ts
import {IQuiz,IChoice,IQuestion} from "./interfaces/quiz"
import { AppStore } from "./interfaces/store";
=======
import {IQuiz,IChoice,IQuestion} from "../interfaces/quiz"
>>>>>>> f0f6d52648cdb2f81c369a2ff12454e9a9f10368:app/redux/quizSlice.ts

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
        }
    }
  })
  
  export const {
    createQuiz,createQuestion,createChoice
  }=quizSlice.actions;

 export const getQuiz=(state:AppStore)=>{
    return state.Quiz;
}
  export default quizSlice.reducer;