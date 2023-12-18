import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const createResult = createAsyncThunk(
    'result/create',
    async (data) => {
        console.log(data)
        const res = await customAxios.post('results', data, axiosConfig);
        return res.data
    }
)
export const findAllResult = createAsyncThunk(
    'result/findAll',
    async () => {
        const res = await customAxios.get('results', axiosConfig);
        return res.data
    }
)
export const findResultById = createAsyncThunk(
    'result/findResultById',
    async (id) => {
        const res = await customAxios.get('results/' + id, axiosConfig);
        return res.data
    }
)
