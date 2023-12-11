import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import {LocalStorageMiddleware} from "./LocalStorageMiddleware";
import RemoveFromLocalStorageMiddleware from "./RemoveFromLocalStorageMiddleware";
import CateQuizReducer from "./user/CateQuizSlice";
import questionSlide from "./question/QuestionSlide";
const middleware = [LocalStorageMiddleware, RemoveFromLocalStorageMiddleware];

export const store = configureStore({
    reducer: {
       users: userReducer,
       categories: CateQuizReducer,
        questionStore : questionSlide,
        // user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
})