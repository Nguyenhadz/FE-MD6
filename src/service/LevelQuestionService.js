import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const findAllLevelQuestion = createAsyncThunk(
    'levelQuestions/findAllLevelQuestion',
    async () => {
        const res = await customAxios.get('levelQuestions', axiosConfig);
        return res.data
    }
)