import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem("currentUser"))
const TOKEN = user?.accessToken;
let axiosConfig = {
    header: {
        Authorization: `Bearer` + TOKEN
    }
};

export const createCateQuestion = createAsyncThunk(
    'cateQuestion',
    async (data) =>{
        const res = await customAxios.post('createCateQuestion', data, axiosConfig);
        return res.data
    }
)

export const findAllCateQuestions = createAsyncThunk(
    'cateQuestion/findAll',
    async () =>{
        const res = await customAxios.get('showAllCateQuestion', axiosConfig);
        return res.data
    }
)