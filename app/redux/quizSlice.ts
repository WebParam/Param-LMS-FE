import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuiz, IQuestion, IChoice, IQuizState, IUpdateQuizDetailState, IUpdateQuestionDetailState, IDeleteQuestion, IDeleteChoice} from "../interfaces/quiz";
import { AppStore } from "../interfaces/store";
import { IModule, IVideo } from "../interfaces/courses";
import { Api } from "../lib/restapi/endpoints";

const generateUniqueId = () => {
  return 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
    return (Math.random() * 16 | 0).toString(16);
  });
};

function sortChoicesByOrder(a: IChoice, b: IChoice) {
  return a.order - b.order;
}

function sortQuestionsByOrder(a: IQuestion, b: IQuestion) {
  return a.order - b.order;
}

export const initialState: IQuizState = {
  quizzes: [] as IQuiz[],
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setSelectedQuizForEdit(state, action) {
      return action.payload;
    },

    createQuizDetail(state, action: PayloadAction<IUpdateQuizDetailState>) {
      const _action = action.payload;

      const newQuiz: IQuiz = {
        id: generateUniqueId(),
        reference: _action.reference,
        createdByUserId: _action.createdByUserId,
        modifiedByUserId: _action.modifiedByUserId,
        createdDate: _action.createdDate,
        questions: [],
        modifiedDate: _action.modifiedDate,
        videoId: _action.videoId,
        state:2
      };

      state.quizzes.push(newQuiz);
    },
    updateQuizzes(state, action: PayloadAction<IQuiz[]>) {
      state.quizzes = action.payload;
    },

    updateQuizState(state, action) {
      const { quizState, quizId  } = action.payload;
      const quizIndex = state.quizzes.findIndex((quiz:IQuiz) => quiz?.id === quizId);

      if (quizIndex !== -1) {
        state.quizzes[quizIndex].state = quizState;
      }
    },

   updateQuizVideoId(state, action: PayloadAction<IVideo[]>) {
      const videosData = action.payload;
      state.quizzes.forEach((quiz) => {
        const matchingVideo = videosData.find((video:IVideo) => video.reference === quiz.reference);
        if (matchingVideo) {
          quiz.videoId = matchingVideo.id;
        }
      });
    },
    createQuestion(state, action: PayloadAction<{ questionDescription: string, points: number }>) {
      const { questionDescription, points } = action.payload;
      const newQuestion: IQuestion = {
        id: generateUniqueId(),
        order: 1,
        questionDescription: questionDescription,
        choices: [] as IChoice[],
        points: points,
      };

      const quizIndex = state.quizzes.length - 1;
      state.quizzes[quizIndex].questions.push(newQuestion);
    },

    deleteQuestion(state, action: PayloadAction<IDeleteQuestion>) {
      const { quizId, questionId } = action.payload;

      const quizIndex = state.quizzes.findIndex((quiz) => quiz.id === quizId);

      if (quizIndex !== -1) {
        const updatedQuestions = state.quizzes[quizIndex].questions.filter((question) => question.id !== questionId);
        state.quizzes[quizIndex].questions = updatedQuestions;
      }
    },

    addChoices(state, action: PayloadAction<{ quizId: string, questionId: string, choiceDescription: string, isCorrect: boolean }>) {
      const { quizId, questionId, choiceDescription, isCorrect } = action.payload;

      const quizIndex = state.quizzes.findIndex((quiz:IQuiz) => quiz?.id === quizId);

      if (quizIndex !== -1) {
        const questionIndex = state.quizzes[quizIndex].questions.findIndex((question) => question.id === questionId);

        if (questionIndex !== -1) {
          const newChoice: IChoice = {
            id: generateUniqueId(),
            order: 1,
            choiceDescription: choiceDescription,
            isCorrect: isCorrect,
          };

          state.quizzes[quizIndex].questions[questionIndex].choices.push(newChoice);
        }
      } else {
        console.log("Choice not created");
      }
    },

    deleteChoiceFromQuestion(state, action: PayloadAction<IDeleteChoice>) {
      const { quizId, questionId, choiceId } = action.payload;

      const quizIndex = state.quizzes.findIndex((quiz) => quiz.id === quizId);

      if (quizIndex !== -1) {
        const questionIndex = state.quizzes[quizIndex].questions.findIndex((question) => question.id === questionId);

        if (questionIndex !== -1) {
          const updatedChoices = state.quizzes[quizIndex].questions[questionIndex].choices.filter((choice) => choice.id !== choiceId);
          state.quizzes[quizIndex].questions[questionIndex].choices = updatedChoices;
        }
      }
    },

    updateChoiceDetail(state, action: PayloadAction<{ quizId: string, questionId: string, choiceId: string, choiceDescription: string, isCorrect: boolean }>) {
      const { quizId, questionId, choiceId, choiceDescription, isCorrect } = action.payload;

      const quizIndex = state.quizzes.findIndex((quiz) => quiz.id === quizId);

      if (quizIndex !== -1) {
        const questionIndex = state.quizzes[quizIndex].questions.findIndex((question) => question.id === questionId);

        if (questionIndex !== -1) {
          const updatedChoices = state.quizzes[quizIndex].questions[questionIndex].choices.map((choice) => {
            if (choice.id === choiceId) {
              return { ...choice, choiceDescription, isCorrect };
            }
            return choice;
          });

          // Sort the choices by order
          state.quizzes[quizIndex].questions[questionIndex].choices = updatedChoices.sort(sortChoicesByOrder);
        }
      } else {
        console.log("Choice is not updated");
      }
    },
    updateChoiceAnswer(state, action: PayloadAction<{ quizId: string, questionId: string, choiceId: string, isCorrect: boolean }>) {
      const { quizId, questionId, choiceId,  isCorrect } = action.payload;

      const quizIndex = state.quizzes.findIndex((quiz) => quiz.id === quizId);

      if (quizIndex !== -1) {
        const questionIndex = state.quizzes[quizIndex].questions.findIndex((question) => question.id === questionId);

        if (questionIndex !== -1) {
          const updatedChoices = state.quizzes[quizIndex].questions[questionIndex].choices.map((choice) => {
            if (choice.id === choiceId) {
              return { ...choice, isCorrect };
            }
            return choice;
          });

          // Sort the choices by order
          state.quizzes[quizIndex].questions[questionIndex].choices = updatedChoices.sort(sortChoicesByOrder);
        }
      } else {
        console.log("Choice is not updated");
      }
    },


    updateQuestionDetails(state, action: PayloadAction<IUpdateQuestionDetailState>) {
      const { quizId, questionId, questionDescription, points } = action.payload;

      const quizIndex = state.quizzes.findIndex((quiz) => quiz.id === quizId);

      if (quizIndex !== -1) {
        const questionIndex = state.quizzes[quizIndex].questions.findIndex((question) => question.id === questionId);

        if (questionIndex !== -1) {
          state.quizzes[quizIndex].questions[questionIndex] = {
            ...state.quizzes[quizIndex].questions[questionIndex],
            questionDescription,
            points,
          };

          // Sort the questions by order
          state.quizzes[quizIndex].questions.sort(sortQuestionsByOrder);
        }
      }
    },
  },
});

export const {
  createQuestion,
  addChoices,
  setSelectedQuizForEdit,
  updateChoiceDetail,
  createQuizDetail,
  updateQuestionDetails,
  deleteChoiceFromQuestion,
  deleteQuestion,
  updateQuizzes,
  updateQuizVideoId,
  updateChoiceAnswer,
  updateQuizState
} = quizSlice.actions;

export const getSelectedQuizForEdit = (state: AppStore) => state.quizzes.quizzes;

export default quizSlice.reducer;
