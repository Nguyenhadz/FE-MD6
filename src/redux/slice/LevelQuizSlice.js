import {createSlice} from "@reduxjs/toolkit";
import {findAllLevelQuestion} from "../service/LevelQuestionService";
import {findAllLevelQuiz} from "../service/LevelQuizService";

const initialState = {
    levelQuiz: []
}

const levelQuizSlide = createSlice({
    name: 'levelQuizSlide',
    initialState,
    extraReducers: builder => {
        builder.addCase(findAllLevelQuiz.fulfilled, (state, action) => {
            state.levelQuiz = action.payload
        })
    }
})

export default levelQuizSlide.reducer