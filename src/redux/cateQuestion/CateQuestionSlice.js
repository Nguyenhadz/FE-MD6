import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {createCateQuestion, deleteCateQuestion, showAllCateQuestion} from "../../service/CateQuestionService";

const initialState = {
    cateQuestions: [],
    cateQuestion: {}
}
const CateQuestionSlice = createSlice({
    name: 'cateQuestion',
    initialState,
    extraReducers: builder => {
        builder.addCase(createCateQuestion.fulfilled, (state, action)=>{
            state.cateQuestion = action.payload
        })
        builder.addCase(showAllCateQuestion.fulfilled, (state, action)=>{
            state.cateQuestions = action.payload
        })
        builder.addCase(deleteCateQuestion.fulfilled, (state, action)=>{
            state.cateQuestions = action.payload
            toast.success('Xoá danh mục thành công', {})
        })
        builder.addCase(deleteCateQuestion.rejected, (state, action)=>{
            toast.error('Không thể xoá danh mục', {})
        })
    }
})
export default CateQuestionSlice.reducer