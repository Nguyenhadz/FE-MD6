import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";


const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
console.log(TOKEN)
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const getStudent = createAsyncThunk(
    'user/getStudent',
    async () => {
        const res = await customAxios.get('admin/students/sort', axiosConfig);
        return res.data;
    }
)
export const getStudentById = createAsyncThunk(
    'user/getStudentById',
    async (id) => {
        const res = await customAxios.get('/users/' + id, axiosConfig);
        return res.data;
    }
)
export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id) => {
        await customAxios.delete('/admin/users/' + id, axiosConfig);
        const res = await customAxios.get('admin/students/sort', axiosConfig);
        return res.data;
    }
)
export const login = createAsyncThunk(
    'user/login',
    async (data) => {
        const res = await customAxios.post('/login', data);
        return res.data;
    }
)
export const logout = createAsyncThunk(
    'user/logout', async () => {
    return {};
});
export const updateUser = createAsyncThunk(
    'user/update',
    async (data)=>{
        const res = await customAxios.put('/users' + data.id, data, axiosConfig)
        return res.data
    }
)