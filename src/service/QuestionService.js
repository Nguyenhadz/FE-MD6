import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken ;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const findAll = createAsyncThunk(
    'questions/findAll',
    async () =>{
        const res = await customAxios.get('questions', axiosConfig);
        console.log(res.data)
        return res.data
    }
)
export const findById = createAsyncThunk(
    'questions/findById',
    async ({id}) =>{
        const res = await customAxios.get('questions/' + id, axiosConfig);
        return res.data
    }
)