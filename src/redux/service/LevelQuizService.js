import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const findAllLevelQuiz = createAsyncThunk(
    'levelQuestions/findAllLevelQuiz',
    async () => {
        const res = await customAxios.get('levelQuizzes', axiosConfig);
        return res.data
    }
)