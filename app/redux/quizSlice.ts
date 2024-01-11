import { createSlice } from "@reduxjs/toolkit";
import { IQuiz, IChoice, IQuestion, IQuizState, IUpdateQuizDetailState, IUpdateQuestionDetailState } from "../interfaces/quiz"
import { AppStore } from "../interfaces/store";

const generateUniqueId = () => {
  return 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
    return (Math.random() * 16 | 0).toString(16);
  });
};

export const questionId = generateUniqueId();
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

      const _action = action.payload as IUpdateQuizDetailState;

      const newState = {
        ...state.quiz,
        reference: _action.reference,
        createdByUserId: _action.createdByUserId,
        modifiedByUserId: _action.modifiedByUserId,
        createdDate: _action.createdDate,
      } as IQuiz;


      state.quiz = newState;
    },


    createQuestion(state, action) {
      
      const { text, points } = action.payload;
      const newQuestion: IQuestion = {
        id: generateUniqueId(),
        text: text,
        choices: [],
        points: points
      };

      state.quiz.questions.push(newQuestion);
    },

    addChoices(state, action) {
      const { questionId, text, isCorrect } = action.payload;

      const newChoice: IChoice = {
        id: generateUniqueId(),
        text: text,
        isCorrect: isCorrect


      };

      const question = state.quiz.questions.find(question => question.id === questionId);
      if (question) {
        question.choices.push(newChoice);
      }
    },
    updateQuestionDetails(state, action) {
      const _action = action.payload as IUpdateQuestionDetailState;
      const targetQuestion = state.quiz.questions.filter(question => question.id == _action.questionId)[0];
      const newQuestion = {
          ...targetQuestion,
          text: _action.text,
          points: _action.points
       
      };
      const existingQuestions = state.quiz.questions.filter(x => x.id != action.payload.questionId);
      const newQuestions = [...existingQuestions, newQuestion];
      const newState = { ...state.quiz, questions: newQuestions };

      state.quiz = newState;


  },
  }
})

export const {
  createQuestion,
  addChoices,
  setSelectedQuizForEdit,
  createQuizDetail,
  updateQuestionDetails
} = quizSlice.actions;
export const getSelectedQuizForEdit = (state: AppStore) => state.Quiz;

export default quizSlice.reducer; 