import {createSlice} from "@reduxjs/toolkit";
import {findAllTypeQuestion} from "../../service/TypeQuestionService";

const initialState = {
    typeQuestions: []
}

const typeQuestionSlide = createSlice({
    name: 'typeQuestionSlide',
    initialState,
    extraReducers: builder => {
        builder.addCase(findAllTypeQuestion.fulfilled, (state, action) => {
            state.typeQuestions = action.payload
        })
    }
})

export default typeQuestionSlide.reducer