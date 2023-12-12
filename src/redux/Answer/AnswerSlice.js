import {createSlice} from "@reduxjs/toolkit";
import {
    createAnswer, deleteAnswersByQuestionId,
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
            console.log()
            state.answers = action.payload
        })
        builder.addCase(deleteAnswersByQuestionId.fulfilled, (state, action)=>{
            state.answers = action.payload
        })

    }
})

export default answersSlice.reducer