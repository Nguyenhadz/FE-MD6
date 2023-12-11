import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken ;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const findAllAnswer = createAsyncThunk(
    'answers/findAllAnswer',
    async () =>{
        const res = await customAxios.get('answers', axiosConfig);
        console.log(res.data)
        return res.data
    }
)