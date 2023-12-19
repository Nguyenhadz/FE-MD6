import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {
    createCateQuestion,
    deleteCateQuestion,
    findCateQuestionById,
    showAllCateQuestion,
    updateCateQuestion,
    findCateQuestionByTeacher,
} from "../service/CateQuestionService";

const initialState = {
    cateQuestions: [],
    cateQuestion: {}
}
const CateQuestionSlice = createSlice({
    name: 'cateQuestion',
    initialState,
    extraReducers: builder => {
        builder.addCase(createCateQuestion.fulfilled, (state, action) => {
            state.cateQuestion = action.payload
            toast.success("Tạo danh mục thành công", {})
        })
        builder.addCase(createCateQuestion.rejected, (state, action) => {
            toast.error("Trùng tên danh mục cũ", {})
        })
        builder.addCase(showAllCateQuestion.fulfilled, (state, action) => {
            state.cateQuestions = action.payload
        })
        builder.addCase(deleteCateQuestion.fulfilled, (state, action) => {
            state.cateQuestions = action.payload
            toast.success('Xoá danh mục thành công', {})
        })
        builder.addCase(deleteCateQuestion.rejected, (state, action) => {
            toast.error('Không thể xoá danh mục', {})
        })
        builder.addCase(findCateQuestionById.fulfilled, (state, action) => {
            state.cateQuestion = action.payload
        })
        builder.addCase(updateCateQuestion.fulfilled, (state, action) => {
            state.cateQuestion = action.payload
            toast.success("Cập nhật thành công!", {})
        })
        builder.addCase(updateCateQuestion.rejected, (state, action) => {
            toast.error("Trùng tên danh mục cũ", {})
        })
        builder.addCase(findCateQuestionByTeacher.fulfilled, (state, action) =>{
            state.cateQuestions = action.payload
        })
    }
})
export default CateQuestionSlice.reducer