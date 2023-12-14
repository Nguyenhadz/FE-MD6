import {createSlice} from "@reduxjs/toolkit";
import {
    approveTeacherPending,
    changePassword,
    deleteUser,
    findStudentByMail,
    findStudentByName,
    findTeacherByMail,
    findTeacherByName,
    getStudent,
    getStudentById,
    getTeacher,
    getTeacherPending,
    login,
    logout,
    updateUser
} from "../../service/UserService";
import {toast} from "react-toastify";

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
        builder.addCase(getTeacher.fulfilled, (state, action) => {
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
        builder.addCase(approveTeacherPending.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(findStudentByName.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(findStudentByMail.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(findTeacherByName.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(findTeacherByMail.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        builder.addCase(changePassword.rejected, (state, action) => {
            toast.error("Đổi mật khẩu thất bại", {})
        })
        builder.addCase(changePassword.fulfilled, (state, action) => {
            toast.success("Đổi mật khẩu thành công", {})
        })
    }
})
export default userSlice.reducer