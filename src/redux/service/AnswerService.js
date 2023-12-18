import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const findAllAnswer = createAsyncThunk(
    'answers/findAllAnswer',
    async () => {
        const res = await customAxios.get('answers', axiosConfig);
        console.log(res.data)
        return res.data
    }
)
export const createAnswer = createAsyncThunk(
    'answers/createAnswer',
    async ({answer}) => {
        console.log(answer)
        const res = await customAxios.post('answers', answer, axiosConfig);
        return res.data
    }
)
export const findAnswersByQuestionId = createAsyncThunk(
    'answers/findAnswerByQuestionId',
    async ({id}) => {
        const res = await customAxios.get('answers/fbq/' + id, axiosConfig);
        return res.data
    }
)
export const deleteAnswersByQuestionId = createAsyncThunk(
    'answers/deleteAnswersByQuestionId',
    async (id) => {
        await customAxios.delete('answers/' + id, axiosConfig);
        const res = await customAxios.get('answers', axiosConfig);
        return res.data;
    }
)
export const deleteAnswerIsEmpty = createAsyncThunk(
    'answers/deleteAnswerIsEmpty',
    async () => {
        await customAxios.delete('answers', axiosConfig);
        const res = await customAxios.get('answers', axiosConfig);
        return res.data;
    }
)