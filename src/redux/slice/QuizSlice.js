import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {createQuiz} from "../service/QuizService";


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
    }
})
export default QuizSlice.reducer