import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const findResultByQuiz = createAsyncThunk(
    'result/findResultByQuiz',
    async (id) => {
        const res = await customAxios.get('results/fbq/' + id, axiosConfig);
        return res.data
    }
)