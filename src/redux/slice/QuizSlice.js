import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {createQuiz, findAllQuiz, findQuizById, updateQuiz} from "../service/QuizService";
import {findQuizByUser} from "../service/QuizService";


const initialState = {
    quizzes: [],
    quiz: {}
}
const QuizSlice = createSlice({
    name: 'quiz',
    initialState,
    extraReducers: builder => {
        builder.addCase(createQuiz.fulfilled, (state, action) => {
            state.quiz = action.payload
        })
        builder.addCase(updateQuiz.fulfilled, (state, action) => {
            state.quiz = action.payload
            toast.success("Cập nhật thành công", {})
        })
        builder.addCase(findQuizById.fulfilled, (state, action) => {
            state.quiz = action.payload
        })

        builder.addCase(findQuizByUser.fulfilled, (state, action) => {
            state.quizzes = action.payload
        })
        builder.addCase(findAllQuiz.fulfilled, (state, action) => {
            state.quizzes = action.payload
        })
    }
})
export default QuizSlice.reducer