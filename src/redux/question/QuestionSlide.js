import {createSlice} from "@reduxjs/toolkit";

import {
    createQuestion,
    findAll,
    findById,
    findByContent,
    findQuestionsByCategory,
    editQuestions
} from "../../service/QuestionService";
import {toast} from "react-toastify";


const initialState = {
    questions: [],
    currentQuestion: {},
    createdQuestion: {},
}

const questionSlide = createSlice({
    name: 'questionSlide',
    initialState,
    extraReducers: builder => {
        builder.addCase(findAll.fulfilled, (state, action)=>{
            state.questions = action.payload
        })
        builder.addCase(findById.fulfilled, (state, action)=>{
            state.currentQuestion = action.payload
        })
        builder.addCase(createQuestion.fulfilled, (state, action)=>{
            toast.success("Tạo câu hỏi mới thành công!", {})
            state.createdQuestion = action.payload
        })
        builder.addCase(findByContent.fulfilled, (state, action)=>{
            state.questions = action.payload
        })
        builder.addCase(findQuestionsByCategory.fulfilled, (state, action)=>{
            state.questions = action.payload
        })
        builder.addCase(editQuestions.fulfilled, (state, action)=>{
            state.currentQuestion = action.payload
        })
    }
})

export default questionSlide.reducer