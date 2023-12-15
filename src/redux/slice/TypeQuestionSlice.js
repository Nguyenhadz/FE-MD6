import {createSlice} from "@reduxjs/toolkit";
import {findAllTypeQuestion} from "../service/TypeQuestionService";

const initialState = {
    typeQuestions: []
}

const typeQuestionSlice = createSlice({
    name: 'typeQuestionSlide',
    initialState,
    extraReducers: builder => {
        builder.addCase(findAllTypeQuestion.fulfilled, (state, action) => {
            state.typeQuestions = action.payload
        })
    }
})

export default typeQuestionSlice.reducer