import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import {LocalStorageMiddleware} from "./LocalStorageMiddleware";
import RemoveFromLocalStorageMiddleware from "./RemoveFromLocalStorageMiddleware";
const middleware = [LocalStorageMiddleware, RemoveFromLocalStorageMiddleware];

export const store = configureStore({
    reducer: {
       users: userReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
})