import {createSlice} from "@reduxjs/toolkit";
import {
    approveTeacher,
    deleteUser,
    getStudent,
    getStudentById,
    getTeacherPending,
    getUserByIdLogin,
    login,
    logout
} from "../../service/UserService";

const initialState = {
    users: [],
    user: {},
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {}

}
const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder.addCase(getStudent.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(getStudentById.fulfilled, (state, action) => {
            state.user = action.payload
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.currentUser = JSON.parse(localStorage.getItem('currentUser')) || {}
        })
        builder.addCase(getTeacherPending.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(approveTeacher.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
})
export default userSlice.reducer