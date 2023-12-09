import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken ;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const createCateQuiz = createAsyncThunk(
    'cateQuiz/create',
    async (data) =>{
        const res = await customAxios.post('categoryQuizzes' + data, axiosConfig);
        return res.data
    }
)