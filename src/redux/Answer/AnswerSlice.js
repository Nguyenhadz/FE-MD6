import {createSlice} from "@reduxjs/toolkit";
import {
    createAnswer,
    findAllAnswer,
    findAnswersByQuestionId
} from "../../service/AnswerService";

const initialState = {
    answers: [],
    currentAnswers: [],
    createdAnswer: {}
}

const answersSlice = createSlice({
    name: 'answerSlice',
    initialState,
    extraReducers: builder => {
        builder.addCase(findAllAnswer.fulfilled, (state, action)=>{
            state.answers = action.payload
        })
        builder.addCase(createAnswer.fulfilled, (state, action)=>{
            state.createdAnswer = action.payload
            console.log(state.createdAnswer)
        })
        builder.addCase(findAnswersByQuestionId.fulfilled, (state, action)=>{
            state.currentAnswers = action.payload
        })
    }
})

export default answersSlice.reducer