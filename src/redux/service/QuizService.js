import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const createQuiz = createAsyncThunk(
    'quiz/create',
    async (data) => {
        console.log(data)
        const res = await customAxios.post('quizzes', data, axiosConfig);
        return res.data
    }
)