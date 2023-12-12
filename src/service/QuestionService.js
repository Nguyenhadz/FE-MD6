import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const findAll = createAsyncThunk(
    'questions/findAll',
    async () => {
        const res = await customAxios.get('questions', axiosConfig);
        console.log(res.data)
        return res.data
    }
)
export const findById = createAsyncThunk(
    'questions/findById',
    async ({id}) => {
        const res = await customAxios.get('questions/' + id, axiosConfig);
        return res.data
    }
)
export const createQuestion = createAsyncThunk(
    'questions/createQuestion',
    async ({question}) =>{
        const res = await customAxios.post('questions', question, axiosConfig);
        return res.data
    }
)
export const findByContent = createAsyncThunk(
    'questions/findByContent',
    async (content) => {
        const res = await customAxios.get('questions/content/' + content, axiosConfig);
        console.log(res.data)
        return res.data
    }
)
export const findQuestionsByCategory = createAsyncThunk(
    'questions/findQuestionsByCategory',
    async ({id}) =>{
        const res = await customAxios.get('questions/category/' + id , axiosConfig);
        return res.data
    }
)
export const editQuestions = createAsyncThunk(
    'questions/editQuestions',
    async (data) =>{
        const res = await customAxios.put('questions/' + data.id, data , axiosConfig);
        return res.data
    }
)