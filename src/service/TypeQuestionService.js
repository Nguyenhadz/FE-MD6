import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const findAllTypeQuestion = createAsyncThunk(
    'typeQuestions/findAllTypeQuestion',
    async () => {
        const res = await customAxios.get('typeQuestions', axiosConfig);
        return res.data
    }
)