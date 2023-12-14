import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import {LocalStorageMiddleware} from "./LocalStorageMiddleware";
import RemoveFromLocalStorageMiddleware from "./RemoveFromLocalStorageMiddleware";
import cateQuizReducer from "./user/CateQuizSlice";
import questionSlide from "./question/QuestionSlide";
import answerReducer from "./Answer/AnswerSlice";
import cateQuestionReducer from "./cateQuestion/CateQuestionSlice";
import typeQuestionSlide from "./typeQuestion/TypeQuestionSlide";
import levelQuestionSlide from "./levelQuestion/LevelQuestionSlide";

const middleware = [LocalStorageMiddleware, RemoveFromLocalStorageMiddleware];

export const store = configureStore({
    reducer: {
        users: userReducer,
        questionStore: questionSlide,
        cateQuiz: cateQuizReducer,
        answersStore: answerReducer,
        cateQuestions: cateQuestionReducer,
        typeQuestionStore: typeQuestionSlide,
        levelQuestionStore: levelQuestionSlide
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
})