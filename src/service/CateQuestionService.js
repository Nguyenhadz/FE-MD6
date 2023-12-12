import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken ;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};

export const createCateQuestion = createAsyncThunk(
    'cateQuestion/create',
    async (data) =>{
        const res = await customAxios.post('categoryQuestion', data, axiosConfig);
        return res.data
    }
)
export const showAllCateQuestion = createAsyncThunk(
    'cateQuestion/showAll',
    async (data) =>{
        const res = await customAxios.get('categoryQuestion/sort', axiosConfig);
        return res.data
    }
)