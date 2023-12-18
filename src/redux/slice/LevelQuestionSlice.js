import {createSlice} from "@reduxjs/toolkit";
import {findAllLevelQuestion} from "../service/LevelQuestionService";

const initialState = {
    levelQuestions: []
}

const levelQuestionSlice = createSlice({
    name: 'levelQuestionSlide',
    initialState,
    extraReducers: builder => {
        builder.addCase(findAllLevelQuestion.fulfilled, (state, action) => {
            state.levelQuestions = action.payload
        })
    }
})

export default levelQuestionSlice.reducer