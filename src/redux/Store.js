import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import {LocalStorageMiddleware} from "./LocalStorageMiddleware";
import RemoveFromLocalStorageMiddleware from "./RemoveFromLocalStorageMiddleware";
import cateQuizReducer from "./user/CateQuizSlice";
import questionSlide from "./question/QuestionSlide";
import answerReducer from "./Answer/AnswerSlice";
const middleware = [LocalStorageMiddleware, RemoveFromLocalStorageMiddleware];

export const store = configureStore({
    reducer: {
        users: userReducer,
        questionStore : questionSlide,
        // user: userReducer,
        cateQuiz: cateQuizReducer,
        answersStore: answerReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
})