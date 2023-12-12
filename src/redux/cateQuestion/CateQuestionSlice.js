import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {createCateQuestion, showAllCateQuestion} from "../../service/CateQuestionService";

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
    }
})
export default CateQuestionSlice.reducer