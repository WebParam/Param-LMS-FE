import { createSlice } from "@reduxjs/toolkit";
import {IQuiz,IChoice,IQuestion, IQuizState} from "../interfaces/quiz"
import { AppStore } from "../interfaces/store";

const generateUniqueId = () => {
  return 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
    return (Math.random() * 16 | 0).toString(16);
  });
};

export const initialState: IQuizState = {
  quiz: {
    id: generateUniqueId(),
    questions: [] as IQuestion[],
    reference: "",
    createdByUserId: "",
    modifiedByUserId: "",
    createdDate: "",
    modifiedDate: "",
  }
};

export const quizSlice = createSlice({
  name: "Quiz",
  initialState,
  reducers: {
    //load entire course to state
    setSelectedQuizForEdit(state, action) {
      state.quiz = action.payload;
    },
    //
    createQuizDetail(state, action) {

      const _action = action.payload as IQuizState;

      const newState = {
        ...state.quiz,
        reference: _action.quiz.reference,
        createdByUserId: _action.quiz.createdByUserId,
        modifiedByUserId: _action.quiz.modifiedByUserId,
        createdDate: _action.quiz.createdDate,
      } as IQuiz;


      state.quiz = newState;
    },


    createQuestion(state, action) {
      const { text,  points } = action.payload;

      const newQuestion: IQuestion = {
          id: generateUniqueId(),
          text:text,
          choices:[],
          points: points
      };

      state.quiz.questions.push(newQuestion);
  },

  addChoices(state, action) {
    const { questionId, text, isCorrect } = action.payload;

    const newChoice: IChoice = {
        text:text,
        isCorrect:isCorrect
       
        
    };

    const question = state.quiz.questions.find(question => question.id === questionId);
    if (question) {
        question.choices.push(newChoice);
    }
},
  
  }
})

export const {
 createQuestion,
 addChoices,
 setSelectedQuizForEdit,
 createQuizDetail
} = quizSlice.actions;
export const getSelectedQuizForEdit = (state: AppStore) => state.Quiz;

export default quizSlice.reducer; 