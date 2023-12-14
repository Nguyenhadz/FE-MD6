import {createSlice} from "@reduxjs/toolkit";
import {createCateQuestion, findAllCateQuestions} from "../../service/CateQuestionService";
import {toast} from "react-toastify";

const initialState = {
    cateQuestions: [],
    cateQuestion:{}
}

const cateQuestionSlice = createSlice({
    name: 'cateQuestion',
    initialState,
    extraReducers: builder => {
        builder.addCase(createCateQuestion.fulfilled, (state, action) => {
            state.cateQuestions = action.payload
            toast.success("Tạo Thành Công",{})
        })
        builder.addCase(createCateQuestion.rejected, (state, action) => {
            state.cateQuestions = action.payload
            toast.success("Tạo Thất Bại",{})
        })
        builder.addCase(findAllCateQuestions.fulfilled, (state, action) => {
            state.cateQuestions = action.payload
        })
    }
})

export default cateQuestionSlice.reducer