import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";


const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken ;
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
        const res = await customAxios.get('users/' + id, axiosConfig);
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
        const res = await customAxios.post('login', data);
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
        const res = await customAxios.put('users/' + data.id, data, axiosConfig)
        return res.data
    }
)
export const findStudentByName = createAsyncThunk(
    'user/findStudentByName',
    async (data) =>{
        const res = await customAxios.get('admin/students/search/'+ data, axiosConfig)
        return res.data
    }
)
export const findStudentByMail = createAsyncThunk(
    'user/findStudentByMail',
    async (data) =>{
        const res = await customAxios.get('admin/students/searchUsername/'+ data, axiosConfig)
        return res.data
    }
)
export const getTeacherPending = createAsyncThunk(
    'user/getTeacherPending',
    async () => {
        const res = await customAxios.get('admin/teachers/pending/sort', axiosConfig);
        return res.data;
    }
)
export const approveTeacherPending = createAsyncThunk(
    'user/approveTeacherPending',
    async (id) => {
        const res = await customAxios.put('admin/teachers/'+ id, axiosConfig);
        return res.data
    }
)
export const getTeacher = createAsyncThunk(
    'user/getTeacher',
    async () => {
        const res = await customAxios.get('admin/teachers/active/sort', axiosConfig);
        return res.data;
    }
)
export const changePassword = createAsyncThunk(
    "users/changePassword",
    async (data) =>{
        const res = await customAxios.post('users/changePassword', data , axiosConfig)
        return res.data
    }
)
export const findTeacherByName = createAsyncThunk(
    'user/findTeacherByName',
    async (data) =>{
        const res = await customAxios.get('admin/teachers/active/search/'+ data, axiosConfig)
        return res.data
    }
)
export const findTeacherByMail = createAsyncThunk(
    'user/findTeacherByMail',
    async (data) =>{
        const res = await customAxios.get('admin/teachers/active/searchUsername/'+ data, axiosConfig)
        return res.data
    }
)