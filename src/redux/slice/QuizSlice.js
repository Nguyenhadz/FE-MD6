import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {createQuiz, findQuizById, updateQuiz} from "../service/QuizService";


const initialState = {
    quizzes: [],
    quiz: {}
}
const QuizSlice = createSlice({
    name: 'quiz',
    initialState,
    extraReducers: builder => {
        builder.addCase(createQuiz.fulfilled, (state, action) => {
            state.quizzes = action.payload
            toast.success("Tạo quiz thành công", {})
        })
        builder.addCase(updateQuiz.fulfilled, (state, action) => {
            state.quiz = action.payload
            toast.success("Sửa quiz thành công", {})
        })
        builder.addCase(findQuizById.fulfilled, (state, action) => {
            state.quiz = action.payload
        })

    }
})
export default QuizSlice.reducer