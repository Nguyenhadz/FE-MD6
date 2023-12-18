import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../slice/UserSlice";
import {LocalStorageMiddleware} from "./LocalStorageMiddleware";
import RemoveFromLocalStorageMiddleware from "./RemoveFromLocalStorageMiddleware";
import cateQuizReducer from "../slice/CateQuizSlice";
import questionSlide from "../slice/QuestionSlice";
import answerReducer from "../slice/AnswerSlice";
import cateQuestionReducer from "../slice/CateQuestionSlice";
import typeQuestionSlide from "../slice/TypeQuestionSlice";
import levelQuestionSlide from "../slice/LevelQuestionSlice";
import resultSlice from "../slice/ResultSlice";
import quizSlice from "../slice/QuizSlice";

const middleware = [LocalStorageMiddleware, RemoveFromLocalStorageMiddleware];

export const store = configureStore({
    reducer: {
        users: userReducer,
        questionStore: questionSlide,
        cateQuiz: cateQuizReducer,
        answersStore: answerReducer,
        cateQuestions: cateQuestionReducer,
        typeQuestionStore: typeQuestionSlide,
        levelQuestionStore: levelQuestionSlide,
        quizStore: quizSlice,
        resultStore: resultSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
})